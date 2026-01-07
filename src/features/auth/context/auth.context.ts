import type { User } from "@/types/global";
import type { AxiosError } from "axios";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null | undefined;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  error: AxiosError | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);
