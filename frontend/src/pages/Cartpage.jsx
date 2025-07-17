import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cartpage = () => {
  const [cart, setCart] = useState([]);

  const cartDisplay = async (user) => {
    try {
      const res = await axios.get(`http://localhost:8080/cart/view/${user}`);

      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cartDisplay();
  }, []);

  //...................................

  const removeitem = async (product) => {
    try {
      const productId = product._id;
      // const updatedCart = cart.filter((item) => item.id !== product.id);
      await axios.delete(`http://localhost:8080/cart/remove/${productId}`, {
        // cart: updatedCart,
      }); // Update cart in  backend

      // setCart(updatedCart); // Update state only after backend update
      cartDisplay();
      // the product id check to item id . and exclude matching product .  and return new arrAY TO updatecart.
      // it only remove from display
      toast.warning("Item removed from your cart");
      cartDisplay();
      // window.location.reload();      // setCart(updatedCart); // Update cart in state
    } catch (error) {
      console.log("Error removing item", error);
    }
  };

  //.......................................................

  const nav = useNavigate();
  const paymenthandle = () => {
    nav("/payment");
  };

  // incr qty
  const [loadingId, setLoadingId] = useState(null);

const inc = async (id) => {
  if (loadingId === id) return; // already processing

  const product = cart.find((item) => item._id === id);
  if (product.qty >= 8) {
    toast.warning("Maximum quantity is 8");
    return;
  }

  setLoadingId(id);
  try {
    await axios.post(
      `http://localhost:8080/updatecart/update/${id}`,
      { action: "increment" },
      { withCredentials: true }
    );
    cartDisplay();
  } catch (error) {
    toast.error("Failed to increment");
  } finally {
    setLoadingId(null);
  }
};


  const decrement = {
    action: "decrement",
  };
  //dec qty
  //CALCULATE TOTAL PRICE
  console.log(cart, "cart");

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );

  const dec = async (id) => {
  if (loadingId === id) return; // already processing

  const product = cart.find((item) => item._id === id);
  if (product.qty <= 1) {
    toast.warning("Minimum quantity is 1");
    return;
  }

  setLoadingId(id);
  try {
    await axios.post(
      `http://localhost:8080/updatecart/update/${id}`,
      { action: "decrement" },
      { withCredentials: true }
    );
    cartDisplay();
  } catch (error) {
    toast.error("Failed to decrement");
  } finally {
    setLoadingId(null);
  }
};
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Your Cart
      </h1>
      {cart.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-lg p-6 flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={product.url}
                  alt={product.name}
                  className="w-36 h-36 object-cover mb-4 rounded-lg shadow-md"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Price: ₹{product.price * product.qty}
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                   disabled={loadingId === product._id}
                    onClick={() => inc(product._id)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                  >
                    +
                  </button>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.qty}
                  </h3>
                  <button
                   disabled={loadingId === product._id}
                    onClick={() => dec(product._id)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                  >
                    -
                  </button>
                </div>

                <button
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={() => removeitem(product)}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>
          {/* Total Price Section */}
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Total Price: ₹{totalPrice.toFixed(2)}
            </h2>
          </div>
          {/* Place Order Button */}
          <div className="flex justify-center mt-6">
            <button
              className="w-full max-w-lg px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
              onClick={paymenthandle}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <p className="text-lg text-center text-gray-600">
          No items in the cart.
        </p>
      )}
    </div>
  );
};

export default Cartpage;
