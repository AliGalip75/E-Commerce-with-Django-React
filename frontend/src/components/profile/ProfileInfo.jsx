import Orders from "@/components/profile/content/Orders";
import UserInfo from "@/components/profile/content/UserInfo";

const ProfileInfo = ({ activeSection }) => {

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return <Orders activeSection={activeSection}></Orders>;
      case "userInfo":
        return <UserInfo></UserInfo>;
      default:
        return <p>Hoş geldiniz!</p>;
    }
  };

  return (
    <div className="space-y-4">
      {renderSection()}
    </div>
  );
};

export default ProfileInfo;
