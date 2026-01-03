import type { User } from "@/types/global";
import type { ReactNode } from "react";
import { AuthContext } from "./auth.context";
import api from "@/api/axios";
import { setupInterceptors } from "@/api/setupInterceptors";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const logoutRef = useRef(logout);

  const isAuthenticated = !!user;

  async function checkAuth() {
    setIsLoading(true);
    try {
      const response = await api.get("/auth/me");
      console.log(response.data);

      setUser(response.data.user);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  function login(user: User) {
    setUser(user);
  }
  function logout() {
    setUser(null);
  }

  useEffect(() => {
    console.log("in auth provider");

    setupInterceptors(logoutRef.current);
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ revalidateAuth: checkAuth, isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
