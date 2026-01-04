import axios from "axios";
import type { LoginData } from "../types/auth.type";
import { useAuth } from "./useAuth";
import { login } from "../api/auth";

export function useLogin() {
  const [error, setError] = useState<null | string>(null);

  const AuthContext = useAuth();
  const navigate = useNavigate();

  function clearError() {
    if (error) setError(null);
  }

  async function loginUser(formData: LoginData) {
    try {
      const user = await login(formData);
      AuthContext.login(user);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(error.response?.data.error);
      }
    }
  }

  return { loginUser, error, clearError };
}
