import api from "../api/axios";

// create contract
export const createContract = async (data) => {
  return await api.post("/catalog/contracts/", data);
};

//get all
export const getContracts = async () => {
  return await api.get("/catalog/contracts/");
};

// ✅ validate / reject
export const updateContract = async (data) => {
  return await api.post("/catalog/validate/", data);
};