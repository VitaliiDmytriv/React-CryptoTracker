import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),

    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(25),

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // помилка піде саме в confirmPassword
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
