import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
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

    useEffect(() => {
        const fetchTypes = async () => {
            const res = await apigetProductTypes("/catalog/productType/");
            setProductTypes(res.data);
        };

        fetchTypes();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            description: form.description,
            unitPrice: Number(form.unitPrice),
            qteLeft: Number(form.qteLeft),
            productType: form.productType,
        };

        await api.post("/catalog/products/", payload);
        toast.success("Product created");
    };

    return (
        <div>
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} />

                <textarea name="description" placeholder="Description" onChange={handleChange} />

                <input name="unitPrice" type="number" placeholder="Unit Price" onChange={handleChange} />

                <input name="qteLeft" type="number" placeholder="Qte Left" onChange={handleChange} />

                {/* Select Product Type */}
                <select name="productType" onChange={handleChange}>
                    <option value="">Select Product Type</option>
                    {productTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Create Product</button>
            </form>

            {/* Add Product Type Button */}
            <Link to="/AddProductType">
                <button className="">+</button>
            </Link>

            {/* List + Edit */}
            <div>
                <h3>Product Types</h3>

                {productTypes.map((type) => (
                    <div key={type.id}>
                        {type.name}
                        <Link to={`/edit-product-type/${type.id}`}>
                            <button className=""></button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddProduct;