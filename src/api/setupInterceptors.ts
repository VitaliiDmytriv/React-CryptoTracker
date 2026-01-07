import api from "@/api/axios";

export function setupInterceptors(logout: () => void) {
  console.log("worked interceptors");
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        logout(); // викликаємо logout з AuthProvider
      }
      return Promise.reject(error);
    }
  );
}
