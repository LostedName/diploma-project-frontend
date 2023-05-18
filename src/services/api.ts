import axios from "axios";

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
const getRefreshHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("refreshToken")}` },
});
export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export { getAuthHeaders, getRefreshHeaders };
