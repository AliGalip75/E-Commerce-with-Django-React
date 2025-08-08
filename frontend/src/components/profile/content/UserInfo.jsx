import { Form, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { formSchema } from "@/schemas/profileSchema";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const UserInfo = () => {
    const { profile, updateUserProfile } = useAuth();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: profile?.first_name || "",
            last_name: profile?.last_name || "",
            email: profile?.email || "",
            phone: profile?.phone || "",
        },
    });

    // `profile` verisi yüklendiğinde formu bu verilerle doldur
    useEffect(() => {
        if (profile) {
            // `reset` metodu, formun tüm değerlerini yeni bir state ile günceller.
            // Bu, asenkron yüklenen veriler için idealdir.
            form.reset(profile);
        }
    }, [profile, form]);

    const onSubmit = async (values) => {
        console.log("Form verileri:", values);
        // updateUserProfile metodunu çağırarak verileri backend'e gönderiyoruz
        await updateUserProfile(values); 
    };

    return (
        <div className="flex">
            {/** Kullanıcı Bilgileri */}
            <div className="flex flex-1 justify-center items-center h-[50rem]">
                <Form {...form} asChild>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-2xl px-5" method="POST">

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


                        <Button className="hover:cursor-pointer" type="submit">Kaydet</Button>
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