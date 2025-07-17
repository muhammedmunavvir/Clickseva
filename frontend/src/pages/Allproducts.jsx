import API_BASE_URL from "../config/apiconfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Allproducts = () => {
  const [products, allproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getproduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/all`);

        allproducts(res.data.data);
      } catch {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    getproduct();
  }, []);

  const nav = useNavigate();
  function fordetails(id) {
    nav(`/productdetails/${id}`);
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products &&
          products.map((obj) => (
            <div
              onClick={() => fordetails(obj._id)}
              key={obj._id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105"
            >
              <img
                src={obj.url}
                alt={obj.heading}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">{obj.heading}</h4>
              <p className="text-gray-700 mb-2">{obj.description}</p>
              <p className="text-lg font-bold text-gray-800 mb-4">
                ₹{obj.price}
              </p>
              <p className="text-lg font-bold text-white bg-green-500 rounded px-2 py-1 mb-4 inline-block">
                {obj.rating} <span className="text-white">⭐</span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
