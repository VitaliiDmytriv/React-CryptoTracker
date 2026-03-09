import type { RegisterSchemaType } from "./shcemas";

export const fieldOrder: (keyof RegisterSchemaType)[] = [
  "email",
  "name",
  "password",
  "confirmPassword",
];
