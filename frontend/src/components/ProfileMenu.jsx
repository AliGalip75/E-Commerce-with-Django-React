import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-zinc-950 dark:text-white">                    
        <BiUser size={20} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-30 z-[200] md:me-0 mt-8 me-3 dark:bg-zinc-800 dark:text-white">
        <DropdownMenuItem asChild className="dark:hover:bg-zinc-700 flex justify-center">
          <Link to="/accounts/login/">Giriş Yap</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="dark:hover:bg-zinc-700 flex justify-center">
          <Link to="/accounts/register/">Kayıt Ol</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;