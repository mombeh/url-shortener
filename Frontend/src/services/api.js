import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // ✅ lower-case b
});

export default instance;
