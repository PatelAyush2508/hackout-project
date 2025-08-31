import axios from "axios";

const API_URL = "http://localhost:5000"; // backend URL

export const issueCredits = async (to, amount, batchId, metadataHash) => {
  const response = await axios.post(`${API_URL}/issue`, { to, amount, batchId, metadataHash });
  return response.data;
};

export const transferCredits = async (id, to, amount) => {
  const response = await axios.post(`${API_URL}/transfer`, { id, to, amount });
  return response.data;
};

export const retireCredits = async (id, amount, reason) => {
  const response = await axios.post(`${API_URL}/retire`, { id, amount, reason });
  return response.data;
};

export const getCredit = async (id) => {
  const response = await axios.get(`${API_URL}/credit/${id}`);
  return response.data;
};
