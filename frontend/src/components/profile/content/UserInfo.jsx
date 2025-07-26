import { Form, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schemas/profileSchema";
import { useAuth } from "@/hooks/useAuth";

const UserInfo = () => {
    const { profile } = useAuth();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: profile || {
            first_name: "",
            last_name: "",
            email: "",
        },
    })

    return (
        <div className="flex">
            {/** Kullanıcı Bilgileri */}
            <div className="flex flex-1 justify-center items-center h-[50rem]">
                <Form {...form}>
                    <form  className="space-y-4 w-2xl px-5">

                        {/* İsim Alanı */}
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <div className="mb-8">
                                    <FormLabel className="mb-3">İsim</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />

                        {/* Soyisim Alanı */}
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <div className="mb-8">
                                    <FormLabel className="mb-3">Soyisim</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />

                        {/* E-Posta */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <div className="mb-8">
                                    <FormLabel className="mb-3">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <div className="mb-8">
                                    <FormLabel className="mb-3">Telefon</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="tel" placeholder="05xx xxx xx xx" />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            )}
                        />


                        <Button type="submit">Kaydet</Button>
                    </form>
                </Form>
            </div>

            {/** şifre güncelleme */}
            <div className="flex-1">

            </div>
        </div>
    )

}

export default UserInfo;