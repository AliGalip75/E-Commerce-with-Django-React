import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileMenu = () => {
  const { logout, accessToken } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-zinc-950 dark:text-white cursor-pointer">
        <BiUser size={20} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-30 z-[200] md:me-0 mt-8 me-3 dark:bg-zinc-800 dark:text-white">
        {!accessToken ? (
          <>
            <DropdownMenuItem asChild className="dark:hover:bg-zinc-700 flex justify-center cursor-pointer">
              <Link to="/accounts/login/">Giriş Yap</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="dark:hover:bg-zinc-700 flex justify-center cursor-pointer">
              <Link to="/accounts/register/">Kayıt Ol</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild className="dark:hover:bg-zinc-700 flex justify-center cursor-pointer">
              <Link to="/profile/">Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}
              className="dark:hover:bg-zinc-700 flex justify-center cursor-pointer">
                Çıkış Yap
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;