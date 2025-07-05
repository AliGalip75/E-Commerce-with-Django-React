import { AuthService } from "@/services/AuthService";
import { useState, useEffect } from "react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SidebarMenu from "@/components/profile/SidebarMenu";
import { useAuth } from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const { accessToken } = useAuth();
    const [activeSection, setActiveSection] = useState("orders");
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await AuthService.getProfile(axios);
                setProfile(data); 
            } catch (error) {
                console.error("Profil verisi alınamadı", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [accessToken]);

    return (
        <div className="flex justify-center pt-10">
            <div className="container">
                {loading && !profile ? (
                    <div className="flex justify-center items-center py-10">
                        <div
                            className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex flex-row">
                        <div className="basis-1/6 me-10">
                            <SidebarMenu 
                                fullName={profile.full_name} 
                                setActiveSection={setActiveSection}
                                activeSection={activeSection}
                            />
                        </div>
                        <div className="basis-5/6">
                            <ProfileInfo profile={profile} activeSection={activeSection} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;