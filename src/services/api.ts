import axios from "axios";

const getAuthHeaders = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});


export const resourceApi = axios.create({
  baseURL: process.env.REACT_APP_RESOURSE_SERVER_BASE_URL,
});

export default axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER_BASE_URL,
});

export { getAuthHeaders };
