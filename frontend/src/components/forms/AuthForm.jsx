import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { useAuth } from "@/hooks/useAuth";
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


const AuthForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit = async (values) => {
    try {
      console.log(values);  // email ve password geliyor mu?
      await login(values.email, values.password, () => navigate("/"));
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        const errors = err.response.data;
        if (errors.email) {  
          form.setError("email", { type: "server", message: errors.email[0] });
        }
        if (errors.password) {
          form.setError("password", { type: "server", message: errors.password[0] });
        }
        if (errors.non_field_errors) {
          form.setError("root", {
            type: "server",
            message: errors.non_field_errors[0]
          });
        }

        
      } else {
        toast.error("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>

        {/** Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ornek@mail.com"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/** Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="justify-between">
                Şifre
                <Link to="#" className="text-blue-700 dark:text-white cursor-pointer font-bold" >Şifreni mi unuttun?</Link>
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full cursor-pointer bg-zinc-950 dark:bg-white hover:bg-zinc-900" disabled={isSubmitting}>
          {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </Button>
        <div className="flex justify-center">
          <Link to="/accounts/register" className="font-light">Hesabın yok mu? <strong>Kayıt Ol.</strong></Link>
        </div>
        
      </form>
    </Form>
  );
};

export default AuthForm;