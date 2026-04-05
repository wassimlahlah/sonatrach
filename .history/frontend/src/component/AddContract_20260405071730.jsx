import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AddContract() {
  const [form, setForm] = useState({
    typeProduct: "",
    qteGlobale: "",
    startDate: "",
    endDate: "",
  });

  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch product types
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const res = await api.getProductTypes("/catalog/product-types/");
        setProductTypes(res.data);
      } catch (err) {
        console.error("Error fetching product types:", err);
      }
    };

    fetchProductTypes();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        typeProduct: form.typeProduct,
        qteGlobale: Number(form.qteGlobale),
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
      };

      await api.post("/catalog/contracts/", payload);

      to("Contract created successfully ✅");

      // reset form
      setForm({
        typeProduct: "",
        qteGlobale: "",
        startDate: "",
        endDate: "",
      });

    } catch (error) {
      console.error("Error creating contract:", error);
      alert("Failed to create contract ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add Contract</h2>

      <form onSubmit={handleSubmit}>

        {/* Product Type */}
        <div>
          <label>Product Type:</label>
          <select
            name="typeProduct"
            value={form.typeProduct}
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

        {/* Quantity */}
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="qteGlobale"
            value={form.qteGlobale}
            onChange={handleChange}
          />
        </div>

        {/* Start Date */}
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>

        {/* End Date */}
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Contract"}
        </button>

      </form>
    </div>
  );
}

export default AddContract;