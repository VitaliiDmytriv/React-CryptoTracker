import type { User } from "@/types/global";
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  revalidateAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
