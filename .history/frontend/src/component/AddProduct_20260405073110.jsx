import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    unitPrice: "",
    qteLeft: "",
    productType: "",
  });

  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📌 Fetch product types
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const res = await api.get("/catalog/product-types/");
        setProductTypes(res.data);
      } catch (err) {
        console.error("Error fetching product types:", err);
      }
    };

    fetchProductTypes();
  }, []);

  // 📌 Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 📌 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        description: form.description,
        unitPrice: Number(form.unitPrice),
        qteLeft: Number(form.qteLeft),
        productType: form.productType,
      };

      await api.post("/catalog/products/", payload);

      toast("Product created successfully ✅");

      // reset form
      setForm({
        name: "",
        description: "",
        unitPrice: "",
        qteLeft: "",
        productType: "",
      });

    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Unit Price */}
        <div>
          <label>Unit Price:</label>
          <input
            type="number"
            name="unitPrice"
            value={form.unitPrice}
            onChange={handleChange}
          />
        </div>

        {/* Quantity Left */}
        <div>
          <label>Qte Left:</label>
          <input
            type="number"
            name="qteLeft"
            value={form.qteLeft}
            onChange={handleChange}
          />
        </div>

        {/* Product Type */}
        <div>
          <label>Product Type:</label>
          <select
            name="productType"
            value={form.productType}
            onChange={handleChange}
          >
            <option value="">Select Product Type</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProduct;