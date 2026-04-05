import api from "../api/axios";

// create contract
export const createContract = async (data) => {
  return await api.post("/catalog/contract/", data);
};

// get contracts
export const getContracts = async () => {
  return await api.get("/catalog/contract/");
};

// validate / reject
export const updateContract = async (data) => {
  return await api.post("/catalog/validateContract/", data);
};

// PDF
export const getContractPDF = (id) => {
  return `${api.defaults.baseURL}/catalog/contractPDF/${id}`;
};