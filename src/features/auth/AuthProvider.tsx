import type { User } from "@/types/global";
import type { ReactNode } from "react";
import { AuthContext } from "./context/auth.context";
import { setupInterceptors } from "@/api/setupInterceptors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { fetchCurrentUser } from "@/features/auth/api/auth";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const logoutRef = useRef(logout);

  const { data: user, isLoading } = useQuery<User | null, AxiosError>({
    queryKey: ["auth", "me"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });

  const isAuthenticated = !!user;

  function login(user: User) {
    queryClient.setQueryData(["auth", "me"], user);
  }

  function logout() {
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
  }

  useEffect(() => {
    setupInterceptors(logoutRef.current);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
