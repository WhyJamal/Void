import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Неправильная электронная почта"),
  password: z.string().min(1, "Пароль обязателен"),
});