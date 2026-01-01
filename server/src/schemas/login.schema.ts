import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(3).max(254).email(),
  password: z.string().min(6).max(72),
});
