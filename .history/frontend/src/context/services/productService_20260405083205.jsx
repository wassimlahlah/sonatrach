import api from "../../api/axios";

export const getProducts = () =>
    api.get("/catalog/product/");

export const createProduct = (data) =>
    api.post("/catalog/product/", data);

export const getProductTypes = () =>
  api.get("/catalog/productType/");

export const createProductType = (data) =>
  api.post("/catalog/productType/", data);