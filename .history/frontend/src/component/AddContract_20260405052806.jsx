import React, { useState } from "react";
import { createContract } from "../services/contractService";

function AddContract() {
  const [form, setForm] = useState({
    number: "",
    type: "",
    Qtetotal: "",
    Qteremaining: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createContract(form);

      setMessage("Contract created successfully ✅");

      // reset form
      setForm({
        number: "",
        type: "",
        Qtetotal: "",
        Qteremaining: "",
      });
    } catch (err) {
      setMessage("Error creating contract ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black/60 p-6 rounded-xl w-[350px] flex flex-col gap-4 border"
      >
        <h2 className="text-xl font-bold text-center">Add Contract</h2>

        <input
          type="text"
          name="number"
          placeholder="Contract Number"
          value={form.number}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Type (Petrol / Gaz)"
          value={form.type}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="number"
          name="Qtetotal"
          placeholder="Total Quantity"
          value={form.Qtetotal}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="number"
          name="Qteremaining"
          placeholder="Remaining Quantity"
          value={form.Qteremaining}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 p-2 rounded font-bold"
        >
          {loading ? "Creating..." : "Create Contract"}
        </button>

        {message && (
          <p className="text-center text-sm mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}

export default AddContract;