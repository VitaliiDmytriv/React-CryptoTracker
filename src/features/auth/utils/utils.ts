import type { LoginSchemaType, RegisterSchemaType } from "./shcemas";

export const fieldOrderRegister: (keyof RegisterSchemaType)[] = [
  "email",
  "name",
  "password",
  "confirmPassword",
];

export const fieldOrderLogin: (keyof LoginSchemaType)[] = ["email", "password"];
