import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthService } from "@/services/AuthService";
import useAxios from "@/hooks/useAxios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const axios = useAxios();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit = async (values) => {
    try {
      await toast.promise(
        AuthService.register(axios, values), // backend'deki endpoint'e göre
        {
          loading: "Kayıt olunuyor...",
          success: "Kayıt başarılı! Giriş yapabilirsiniz.",
          error: "Kayıt başarısız.",
        }
      );
      navigate("/accounts/login/");
    } catch (err) {
      if (err.response?.data?.email) {
        form.setError("email", { type: "server", message: err.response.data.email[0] });
      } else {
        toast.error("Beklenmedik bir hata oluştu.");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ornek@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre (Tekrar)</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-zinc-950 dark:bg-white hover:bg-zinc-900" disabled={isSubmitting}>
          {isSubmitting ? "Kayıt olunuyor..." : "Kayıt Ol"}
        </Button>

        <div className="flex justify-center">
          <Link to="/accounts/login" className="font-light">Zaten hesabın var mı? <strong>Giriş Yap.</strong></Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
