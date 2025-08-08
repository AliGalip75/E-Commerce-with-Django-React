import { z } from "zod";

export const formSchema = z.object({
  first_name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  last_name: z.string().min(2, "Soyisim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().min(10, "Telefon numarası geçersiz"),
});