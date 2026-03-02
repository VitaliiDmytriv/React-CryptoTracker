// api/auth.ts
import type { User } from "@/types/global";
import type { AxiosResponse } from "axios";
import api from "@/api/axios";
import type { AuthMeResponse, LoginData, LoginResponse } from "../types/auth.type";
import { authEndpoints, userEndpoints } from "@/lib/endpoints";

export async function fetchCurrentUser(): Promise<User | null> {
  const response: AxiosResponse<AuthMeResponse> = await api.get(userEndpoints.me);
  console.log("result from fetchUser:", response.data.user);

  return response.data.user ?? null;
}

export async function login(formData: LoginData) {
  const response: AxiosResponse<LoginResponse> = await api.post(authEndpoints.login, formData);
  return response.data.user;
}

export async function logout() {
  return await api.post<AxiosResponse<{ ok: true }>>(authEndpoints.logout);
}
