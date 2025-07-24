import axios from "axios";
import API_BASE_URL from "../config/apiconfig";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Myorders = () => {
  const [myorders, setMyorders] = useState([]);

  const Getmyorder = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/myorders`);
      console.log(res.data);
      setMyorders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Getmyorder();
  }, []);

  const ordercancel = async (orderId) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/user/cancelorder/${orderId}`
      );
      toast.success("Order cancelled!");

      setMyorders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-700">
        My Orders
      </h2>

      {myorders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {myorders.map((order, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b pb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {order.orderId}
                  </p>
                  <p className="font-semibold text-lg text-gray-800 mt-1">
                    Status:{" "}
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold ${
                        order.status === "Order confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Packing"
                          ? "bg-purple-100 text-purple-700"
                          : order.status === "Shipped"
                          ? "bg-indigo-100 text-indigo-700"
                          : order.status === "Out for delivery"
                          ? "bg-orange-100 text-orange-700"
                          : order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status === "Order confirmed" && (
                        <>✅ {order.status}</>
                      )}
                      {order.status === "Packing" && <>📦 {order.status}</>}
                      {order.status === "Shipped" && <>🚚 {order.status}</>}
                      {order.status === "Out for delivery" && (
                        <>🛵 {order.status}</>
                      )}
                      {order.status === "Completed" && <>✔️ {order.status}</>}
                      {order.status === "Cancelled" && <>❌ {order.status}</>}
                      {![
                        "Order confirmed",
                        "Packing",
                        "Shipped",
                        "Out for delivery",
                        "Completed",
                        "Cancelled",
                      ].includes(order.status) && <>{order.status}</>}
                    </span>
                  </p>
                </div>
                <div>
                  {order.status !== "Cancelled" &&
                    order.status === "Order confirmed" && (
                      <button
                        className="bg-red-500 rounded-md p-1 text-white"
                        onClick={() => ordercancel(order.orderId)}
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-sm text-gray-500">Placed on:</p>
                  <p className="text-md text-gray-700 font-medium">
                    {new Date(order.createdAt)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                      .replace(/\s/g, "-")}
                  </p>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-4 text-gray-700">
                <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
                <p>
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.housename}
                </p>
                <p>
                  {order.shippingAddress.place},{" "}
                  {order.shippingAddress.postOffice}
                </p>
                <p>
                  {order.shippingAddress.district},{" "}
                  {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>
                <p>📞 {order.shippingAddress.mobilenumber}</p>
                <p>📧 {order.shippingAddress.email}</p>
              </div>

              {/* Payment Info */}
              <div className="mb-6 text-gray-700">
                <h3 className="text-lg font-semibold mb-1">Payment</h3>
                <p>
                  Method:{" "}
                  <span className="font-medium">{order.paymentmethod}</span>
                </p>
                <p>
                  Total:{" "}
                  <span className="font-bold text-indigo-600">
                    ₹{order.totalAmount}
                  </span>
                </p>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-x-auto">
                  {order.products.map((product, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                    >
                      <img
                        src={product.url}
                        alt={product.heading}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h4 className="text-md font-bold text-gray-800">
                        {product.heading}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.discription}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Category: {product.catogory}
                      </p>
                      <p className="mt-1 text-md font-semibold text-indigo-700">
                        ₹{product.price}
                      </p>
                      <p className="text-yellow-500">⭐ {product.rating}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
