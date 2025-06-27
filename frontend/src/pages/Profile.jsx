import { authService } from "@/services/AuthService";
import { useState, useEffect } from "react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import SidebarMenu from "@/components/profile/SidebarMenu";
import { LocalStorageManager } from "@/utils/localStorageManager";


const Profile = () => {
    const [profile, setProfile] = useState(null);
    const accessToken = LocalStorageManager.getAccessToken();
    const [activeSection, setActiveSection] = useState("orders");

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const data = await authService.getProfile();
            setProfile(data);

        } catch (error) {
            console.error("Profil verisi alınamadı", error);
        }
        };

        fetchProfile();
    }, [accessToken]);

    if (!profile) return <p>Yükleniyor...</p>;


    return (
        <div className="flex justify-center pt-10">
            <div className="container">
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
            </div>
        </div>
    );

}

export default Profile;