import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta girin" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalı" }),
});