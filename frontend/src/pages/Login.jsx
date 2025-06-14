import { useContext, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const Login = () => {
    const { login, loading } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await toast.promise(
            axiosInstance.post("accounts/token/", { email, password }),
            {
                
                loading: "Giriş yapılıyor...",
                success: "Başarıyla giriş yapıldı!",
                error: (err) => {
                    const data = err.response?.data;

                    if (data?.detail) {
                        return data.detail;
                    }

                    if (typeof data === "object" && data !== null) {
                        const allMessages = [];

                        Object.entries(data).forEach(([field, messages]) => {
                            if (Array.isArray(messages)) {
                                messages.forEach((msg) => {
                                allMessages.push(`${field} : ${msg}`);
                                });
                            } else {
                                allMessages.push(`${field} : ${messages}`);
                            }
                        });

                        return allMessages.join("\n"); // Çoklu mesaj varsa satır satır göster
                    }

                return "Bilinmeyen bir hata oluştu.";
                },
            }
        ).then((response) => {
            console.log("Login response:", response.data); 
            const access = response.data.access;
            if (!access) {
                toast.error("Token alınamadı. Lütfen tekrar giriş yapın.");
                return;
            }
            localStorage.setItem("access", access);
            login(email, password);
            navigate("/");
        }).catch((err) => {
            console.error("Giriş hatası detayı:", err.response?.data);
        });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="h-[30%] flex justify-center items-end mt-5">
                <Link to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-40 fill-black">
                        <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
                            <path d="M1791 5088 c-5 -13 -407 -1153 -894 -2534 -488 -1381 -889 -2518 -893 -2528 -6 -16 26 -17 582 -14 643 4 624 3 749 65 157 79 307 267 386 483 47 131 1591 4513 1597 4533 4 16 -37 17 -757 17 l-761 0 -9 -22z"/>
                            <path d="M3510 4504 c-6 -16 -178 -501 -381 -1079 l-370 -1050 322 -915 c177 -503 336 -946 354 -985 104 -227 257 -376 455 -441 50 -16 108 -18 644 -22 565 -3 588 -3 582 15 -4 10 -363 1026 -798 2258 -434 1232 -792 2242 -794 2244 -2 2 -8 -9 -14 -25z"/>
                        </g>
                    </svg>
                </Link>
            </div>
            <div className="h-[70%] flex justify-center items-center mb-5">
                <div className="min-w-md min-h-10/15 p-6 border border-gray-200 rounded-lg shadow-md bg-white"> 
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Giriş Yap</h2>
                    <form onSubmit={handleLogin} className="space-y-5" noValidate>
                        {/* E-posta alanı */}
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                            <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Parola alanı ve "Şifremi unuttum" */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Parola</label>
                            <a href="/sifremi-unuttum" className="text-sm text-blue-600 hover:underline">Şifremi unuttum?</a>
                            </div>
                            <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Giriş Yap butonu */}
                        <button
                            type="submit"
                            className={"w-full bg-zinc-950 outline-1 text-white py-2 rounded hover:bg-zinc-900 flex flex-row justify-center items-center group h-[45px]"}
                        >
                            <div className="flex h-full">
                                <h1 className="me-1 flex items-center h-full">Giriş yap</h1>
                                <div className="transform transition-all duration-300 group-hover:translate-x-1.5 h-full flex items-center">
                                    <svg className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                                </div>
                            </div>
                        </button>
                    </form>
                    {/* Alt bilgi metni */}
                    <p className="text-center mt-4 text-sm text-gray-600">
                        Hesabın yok mu?{' '}
                        <Link to="/accounts/register" className="text-blue-600 hover:underline">
                        Kayıt Ol
                        </Link>
                    </p>            
                </div>
            </div>
        </div>
        
        
    );

};

export default Login;