import api from ".../api/";

export const getContracts = () => 
    api.get("/catalog/contract/");

export const createContract = (data) =>
    api.post("/catalog/contract/", data);

export const validateContract = (data) =>
    api.post("/catalog/validateContract/", data);

export const getContractPDF = (id) =>
    `${api.defaults.baseURL}/catalog/contractPDF/${id}`;