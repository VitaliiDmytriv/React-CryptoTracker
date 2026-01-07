// api/auth.ts
import type { User } from "@/types/global";
import type { AxiosResponse } from "axios";
import api from "@/api/axios";
import type { AuthMeResponse, LoginData, LoginResponse } from "../types/auth.type";

export async function fetchCurrentUser(): Promise<User | null> {
  const response: AxiosResponse<AuthMeResponse> = await api.get("/auth/me", {
    headers: {
      "Cache-Control": "no-store",
    },
  });
  console.log("result from fetchUser:", response.data.user);

  return response.data.user ?? null;
}

export async function login(formData: LoginData) {
  const response: AxiosResponse<LoginResponse> = await api.post("/auth/login", formData);
  return response.data.user;
}
