import type { User } from "@/types/global";

export interface LoginResponse {
  user: User;
  message: string;
}

export interface AuthMeResponse {
  user: User;
}

export type RegisterResponse = {
  user: User;
  message: string;
};
