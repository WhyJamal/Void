import { z } from "zod";

export const signUpSchema = z.object({
      name: z.string().min(3, "Имя должно содержать не менее 3 символов"),
      email: z.string().email("Неправильная электронная почта"),
      password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    });