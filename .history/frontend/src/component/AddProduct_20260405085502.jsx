import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductTypes, createProduct } from "../context/services/productService";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    unitPrice: "",
    qteLeft: "",
    productType: "",
  });

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getProductTypes("/catalog/productType/");
        setProductTypes(res.data);
      } catch (err) {
        toast.error("Failed to load product types");
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: form.name,
        description: form.description,
        unitPrice: Number(form.unitPrice),
        qteLeft: Number(form.qteLeft),
        productType: form.productType,
      };

      await createProduct("/catalog/products/", payload);
      toast.success("Product created");
    } catch (err) {
      toast.error("Error creating product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transpart  text-white">
      
      {/* CARD */}
      <div className="w-full max-w-lg bg-black/30 text-black rounded-2xl shadow-lg p-6 border border-black/20">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-500">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full text-black p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full text-black p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Unit Price */}
          <input
            name="unitPrice"
            type="number"
            placeholder="Unit Price"
            onChange={handleChange}
            className="w-full text-black p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Quantity */}
          <input
            name="qteLeft"
            type="number"
            placeholder="Qte Left"
            onChange={handleChange}
            className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Product Type */}
          <select
            name="productType"
            onChange={handleChange}
            className="w-full text-black p-2 border border-black-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Product Type</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-black bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Create Product
          </button>
        </form>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <Link to="/AddProductType">
            <button className="bg-black text-orange-500 border border-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition">
              + Add Type
            </button>
          </Link>

          <Link to="/edit-product-type">
            <button className="bg-white text-black border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition">
              Edit Types
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;