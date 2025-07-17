import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Addnewproduct = () => {
  const [product, setproduct] = useState({
    // id: "",
    heading: "",
    discription: "",
    url: "",
    catogory: "",
    price: "",
    rating: "",
    qty:1
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setproduct((prevproduct) => ({ ...prevproduct, [name]: value }));
  };

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/admin/newProduct`, product);
      toast.success("product add succseesfully!");
      navigate("/admin/allproducts");
    } catch {
      console.log("Error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Add products
      </h2>
      <form className="space-y-4" onSubmit={handlesubmit}>
        {/* <div>
          <label className="block text-gray-700 font-medium">Product ID</label>
          <input
            onChange={inputHandle}
            type="number"
            placeholder="product ID"
            value={product.id}
            name="id"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div> */}
        <div>
          <label className="block text-gray-700 font-medium">
            Item Heading
          </label>
          <input
            onChange={inputHandle}
            type="text"
            placeholder="Item Heading"
            value={product.heading}
            name="heading"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            onChange={inputHandle}
            placeholder="Item Description"
            value={product.discription}
            name="discription"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Image URL</label>
          <input
            onChange={inputHandle}
            type="text"
            placeholder="Image URL"
            value={product.url}
            name="url"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            onChange={inputHandle}
            type="text"
            placeholder="Category"
            value={product.catogory}
            name="catogory"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            onChange={inputHandle}
            type="number"
            placeholder="Price"
            value={product.price}
            name="price"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Rating</label>
          <input
            onChange={inputHandle}
            type="number"
            placeholder="Rating (1-5)"
            value={product.rating}
            name="rating"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
