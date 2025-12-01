import axios from "axios";

const api = axios.create({
  baseURL: "https://clothing-ecommerce-backend-8089.onrender.com/api",
  withCredentials: true, 
});

export default api;
