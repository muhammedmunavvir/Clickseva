import { orderModel } from "../models/order-scheama.js";
import { trycatch } from "../utilities/asycErrorHandling.js";

export const myorders = trycatch(async (req, res) => {
 
  const userId = req.userId;
 
  const myorders = await orderModel.find({ userId }).sort({ createdAt: -1 });
  

  res
    .status(201)
    .json({ status: "success", message: "myorders", data: myorders });
});
export const cancelorder = trycatch(async (req, res) => {
  const { orderId } = req.params;


 await orderModel.findOneAndUpdate(
  { orderId: orderId }, 
  { $set: { status: "Cancelled" } }
);

  res.status(200).json({ status: "success", message: "order Cancelled" });
});
  