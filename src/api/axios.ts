import axios from "axios";

// const IP = "192.168.0.102";
const dev = "localhost";
const BASE_URL = `http://${dev}:5000`;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export default instance;
