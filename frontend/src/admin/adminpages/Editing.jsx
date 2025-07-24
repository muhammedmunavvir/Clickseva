import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Editing = () => {
  const navigate = useNavigate();
  const { pID } = useParams();

  const [form, myform] = useState({
    heading: "",
    description: "",
    url: "",
    catogory: "",
    price: "",
    rating: "",
  });

  const productfetch = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/products/${pID}`);
      myform(res.data.data);
      console.log(res.data.data)
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    productfetch();
  }, []);

  const inputHandle = (e) => {
    const { name, value } = e.target;
    myform((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/admin/updateProduct/${pID}`,
        form
      );
      toast.success("Product updated");
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Error while editing product", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Edit Product
      </h2>
      <form onSubmit={submitHandle} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Item Heading
          </label>
          <input
            onChange={inputHandle}
            type="text"
            placeholder="Item Heading"
            value={form.heading}
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
            value={form.description}
            name="description"
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
            value={form.url}
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
            value={form.catogory}
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
            value={form.price}
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
            value={form.rating}
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
