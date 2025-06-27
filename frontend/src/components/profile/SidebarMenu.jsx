import { FaInbox } from "react-icons/fa";
import { GrChatOption } from "react-icons/gr";
import { FiShoppingBag } from "react-icons/fi";
import { MdFavoriteBorder, MdOutlineDiscount, MdHelpOutline } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MenuItem from "@/components/profile/common/MenuItem";

const SidebarMenu = ({ fullName, setActiveSection, activeSection }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Kullanıcı Adı */}
      <Card className="dark:bg-zinc-900 dark:shadow-2xl">
        <CardHeader className="p-2">
          <CardTitle className="text-center text-lg">{fullName}</CardTitle>
        </CardHeader>
      </Card>

      {/* Siparişlerim */}
      <Card className="dark:bg-zinc-900 dark:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-base">Siparişlerim</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-2 mt-2">
          <MenuItem
            icon={FaInbox}
            label="Tüm Siparişlerim"
            onClick={() => setActiveSection("orders")}
            isActive={activeSection === "orders"}
          />
          <MenuItem
            icon={GrChatOption}
            label="Değerlendirmelerim"
            onClick={() => setActiveSection("reviews")}
            isActive={activeSection === "reviews"}
          />
          <MenuItem
            icon={FiShoppingBag}
            label="Tekrar Satın Al"
            onClick={() => setActiveSection("reorder")}
            isActive={activeSection === "reorder"}
          />
        </CardContent>
      </Card>

      {/* Sana Özel */}
      <Card className="dark:bg-zinc-900 dark:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-base">Sana Özel</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-2 mt-2">
          <MenuItem
            icon={MdFavoriteBorder}
            label="Favorilerim"
            onClick={() => setActiveSection("favorities")}
            isActive={activeSection === "favorities"}
          />
          <MenuItem
            icon={MdOutlineDiscount}
            label="İndirim Kuponlarım"
            onClick={() => setActiveSection("discountCoupon")}
            isActive={activeSection === "discountCoupon"}
          />
        </CardContent>
      </Card>

      {/* Hesap & Yardım */}
      <Card className="dark:bg-zinc-900 dark:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-base">Hesabım & Yardım</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-2 mt-2">
          <MenuItem
            icon={BiUser}
            label="Kullanıcı Bilgilerim"
            onClick={() => setActiveSection("userInfo")}
            isActive={activeSection === "userInfo"}
          />
          <MenuItem
            icon={IoLocationOutline}
            label="Adres Bilgilerim"
            onClick={() => setActiveSection("addressInfo")}
            isActive={activeSection === "addressInfo"}
          />
          <MenuItem
            icon={MdHelpOutline}
            label="Yardım"
            onClick={() => setActiveSection("help")}
            isActive={activeSection === "help"}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarMenu;