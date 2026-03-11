import axios from "axios";
import type { LoginData } from "../types/auth.type";
import { useAuth } from "./useAuth";
import { login } from "../api/auth";
import { useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const [error, setError] = useState<null | string>(null);

  const AuthContext = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function clearError() {
    if (error) setError(null);
  }

  async function loginUser(formData: LoginData) {
    try {
      const user = await login(formData);
      AuthContext.login(user);
      queryClient.clear();
      navigate("/dashboard/main", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(error.response?.data.error);
      }
    }
  }

  return { loginUser, error, clearError };
}
