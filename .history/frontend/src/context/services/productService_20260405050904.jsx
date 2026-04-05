import api from "../api/axios";

export const getProducts = () => 
    api.get("/catalog/product/");

export const createProduct = (data) =>
  api.post("/catalog/product/", data);