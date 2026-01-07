import type { User } from "@/types/global";
import type { ReactNode } from "react";
import { AuthContext } from "./context/auth.context";
import { setupInterceptors } from "@/api/setupInterceptors";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { fetchCurrentUser } from "@/features/auth/api/auth";
import { authKeys } from "@/lib/queryKeys";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const logoutRef = useRef(logout);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User | null, AxiosError>({
    queryKey: authKeys.me(),
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnMount: true,
  });

  // const isAuthenticated = !!user;
  const isAuthenticated = user !== null && user !== undefined;

  function login(user: User) {
    queryClient.setQueryData(authKeys.me(), user);
  }

  function logout() {
    queryClient.setQueryData(authKeys.me(), null);
  }

  useEffect(() => {
    setupInterceptors(logoutRef.current);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}
