import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Category = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);

  const fetchproduct = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products/all");
      setproduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  const cat = product.filter(
    (item) => item.catogory === "cat-food" || item.Catogory === "cat-treat"
  );
  const dog = product.filter(
    (item) => item.catogory === "dog-food" || item.Catogory === "dog-bed"
  );

  //DELETE PRODUCT
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/deleteProduct/${_id}`);
      toast.warning("Item deleted");
      fetchproduct();
    } catch (error) {
      console.log("Error delteing product", error);
    }
  };

  //EDIT PRODUCT
  const handleEdit = (_id) => {
    navigate(`/admin/editing/${_id}`);
  };
  return (
    <>
      {/* Cat Section */}
      <div className="p-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Cat Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cat.map((obj) => (
            <div
              key={obj._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto"
            >
              <img
                src={obj.url}
                alt={obj.heading}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {obj.heading}
                </h1>
                <p className="text-sm text-gray-600 mt-2">{obj.description}</p>
                <h2 className="text-lg font-medium text-gray-700 mt-2">
                  {obj.catogory}
                </h2>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  Price: {obj.price}
                </p>
                <p className="text-sm text-yellow-500 mt-1">
                  Rating: {obj.rating}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleEdit(obj._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(obj._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dog Section */}
      <div className="p-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Dog Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dog.map((obj) => (
            <div
              key={obj._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto"
            >
              <img
                src={obj.url}
                alt={obj.heading}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  {obj.heading}
                </h1>
                <p className="text-sm text-gray-600 mt-2">{obj.description}</p>
                <h2 className="text-lg font-medium text-gray-700 mt-2">
                  {obj.catogory}
                </h2>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  Price: {obj.price}
                </p>
                <p className="text-sm text-yellow-500 mt-1">
                  Rating: {obj.rating}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleEdit(obj._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(obj._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
