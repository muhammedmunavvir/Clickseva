import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Prodectgrid = () => {
  const [featuredproducts, getfeaturedproducts] = useState([]);

  useEffect(() => {
    const getproduct = async () => {
      try {
        const res = await axios.get("http://localhost:8080/products/featured");

        getfeaturedproducts(res.data.data);
      } catch (error) {
        console.log("error fetching products", error);
      }
    };

    getproduct();
  }, []);

  const nav = useNavigate();
  const fordetails = (id) => {
    nav(`/Productdetails/${id}`);
  };

  return (
    <div className=" bg-[#0a484a]">
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-white mb-8">
          Featured Products
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredproducts.map((obj) => (
            <div
              onClick={() => fordetails(obj._id)}
              key={obj._id}
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer w-full max-w-sm"
            >
              <img
                src={obj.url}
                alt={obj.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />

              <div className="p-6">
                <h4 className="text-xl font-semibold text-white">{obj.name}</h4>
                <p className="text-sm text-gray-300 mt-1">{obj.heading}</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-white font-bold text-lg">${obj.price}</p>
                  <button className="bg-white text-[#0a484a] px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section> {/* For categories or additional content */}</section>
    </div>
  );
};
