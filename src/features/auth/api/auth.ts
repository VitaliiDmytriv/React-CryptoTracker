// api/auth.ts
import type { User } from "@/types/global";
import type { AxiosResponse } from "axios";
import api from "@/api/axios";
import type { AuthMeResponse, LoginResponse, RegisterResponse } from "../types/auth.type";
import { authEndpoints, userEndpoints } from "@/lib/endpoints";
import type { LoginSchemaType, RegisterSchemaType } from "../utils/shcemas";

export async function fetchCurrentUser(): Promise<User | null> {
  const response: AxiosResponse<AuthMeResponse> = await api.get(userEndpoints.me);
  console.log("result from fetchUser:", response.data.user);

  return response.data.user ?? null;
}

export async function login(formData: LoginSchemaType) {
  return await api.post<LoginResponse>(authEndpoints.login, formData);
}

export async function logout() {
  return await api.post<AxiosResponse<{ ok: true }>>(authEndpoints.logout);
}

export async function register(registerData: RegisterSchemaType) {
  return await api.post<RegisterResponse>(authEndpoints.register, registerData);
}
