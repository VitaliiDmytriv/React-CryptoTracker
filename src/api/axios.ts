import axios from "axios";

const BASE_URL = "http://localhost:5000";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // якщо 401 або 403 → редірект на логін
      if (status === 401 || status === 403) {
        // перенаправлення на login
        // window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
