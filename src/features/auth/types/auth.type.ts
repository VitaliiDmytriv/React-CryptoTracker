import type { User } from "@/types/global";

export type LoginData = {
  email: string;
  password: string;
};

export interface LoginResponse {
  user: User;
}

export interface AuthMeResponse {
  user: User;
}
