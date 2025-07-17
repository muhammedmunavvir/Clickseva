import { orderModel } from "../models/order-scheama.js";
import { usermodel } from "../models/userScheama.js";
import { trycatch } from "../utilities/AsycErrorHandling.js";
import { CustomErrorhandler } from "../utilities/customErrorHAndling.js";
import Razorpay from "razorpay";
import { config } from "dotenv";
config();

import crypto from "crypto"; // Ensure the crypto module is imported
import { orderdetailsService } from "../services/payment-service.js";

// Payment Route
export const payment = trycatch(async (req, res) => {
 

  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const userId = req.userId;
  const { paymentmethod, shippingAddress } = req.body;

  const user = await usermodel.findOne({ _id: userId });
  if (!user) {
    throw CustomErrorhandler("User not found.");
  }

  const cart = user.cart;

  if (cart.length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Cart is empty. Add items to proceed.",
    });
  }
 
const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(totalAmount,"totalma")

  // Create Razorpay order  
  const options = {
    amount: totalAmount * 100, // Convert to paise
    currency: "INR",
    receipt: `order_rcpt_${Date.now()}`, // Random 10-character string
    // payment_capture: 1,  // Auto capture payment
  };

  const order = await instance.orders.create(options);
  

  if (!order) return res.status(500).send("Some error occured");

  const Ordernumber = () => {
  const prefix = "ORD"; // Static prefix
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // e.g., 20250716
  const timePart = Date.now().toString().slice(-5); // Last 5 digits of timestamp for uniqueness
  return `${prefix}-${datePart}-${timePart}`;
};


  // Create a new order in your database
  const newOrder = await orderModel.create({
    orderId:Ordernumber(), 
    userId: userId,
    products: cart,
    totalAmount: totalAmount,
    shippingAddress: shippingAddress,
    paymentmethod: paymentmethod,
    razorpayOrderId: order.id, // Save Razorpay order ID
    status: "Pending", // Set status to pending initially
  });

  // Clear the cart
  user.cart = [];
  user.markModified("cart");
  await user.save();

  return res.status(201).json({
    status: "success",
    message: "Order created and awaiting payment.",
    order: newOrder,
    totalAmount: totalAmount,
    razorpay_order_id: order.id, // Correct Razorpay order ID from creation

    // razorpay_payment_id: null,  // Payment ID will be provided after payment
    // razorpay_signature: null,  // Signature will be verified later
  });
});

// Verify Payment Route
export const verifypayment = trycatch(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
 

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing fields in request body.",
    });
  }

  // Generate the expected signature
  const hmac = crypto.createHmac("sha256", process.env.KEY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest("hex");

  // Compare the generated signature with the received signature
  if (generatedSignature === razorpay_signature) {
    const order = await orderModel.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { status: "Paid" },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      order,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid payment signature.",
    });
  }
});

//order details
export const orderdetailcontroller = trycatch(async (req, res) => {
  const userId = req.userId;
 

  const ORDERDETAILS = await orderdetailsService(userId);

  return res.status(200).json({
    status: "success",
    message: "get order details",
    data: ORDERDETAILS,
  });
});
