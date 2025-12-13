import type { User } from "@/types/global";
import type { ReactNode } from "react";
import { AuthContext } from "./auth.context";
import api from "@/api/axios";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const response = await api.get("/");
        console.log(response.data);

        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (err) {
        console.log(err);

        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    initializeAuth();
  }, []);

  function login(user: User) {
    setUser(user);
    setIsAuthenticated(true);
  }
  function logout() {}

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
