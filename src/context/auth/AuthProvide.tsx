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
  useEffect(() => {
    async function initializeAuth() {
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
    setupInterceptors(logoutRef.current);
    initializeAuth();
  }, []);

  function login(user: User) {
    setUser(user);
  }
  function logout() {
    setUser(null);
    console.log("worked from Interseptor");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
