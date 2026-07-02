import axios from "axios";

const API = axios.create({
  baseURL: "https://aurora-backend-7bwl.onrender.com/api",
});

export default API;