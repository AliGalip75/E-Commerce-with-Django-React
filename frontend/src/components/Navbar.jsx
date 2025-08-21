import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ProfileMenu from "@/components/ProfileMenu";
import CartIcon from "@/components/CartIcon";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <div className="container md:mx-auto flex items-center justify-between py-5">
      
      {/* Logo & Marka */}
      <Link to="/" className="flex ms-5 md:mx-0 items-center gap-2 font-semibold text-xl">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-7 fill-current">
            <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
                <path d="M1791 5088 c-5 -13 -407 -1153 -894 -2534 -488 -1381 -889 -2518 -893 -2528 -6 -16 26 -17 582 -14 643 4 624 3 749 65 157 79 307 267 386 483 47 131 1591 4513 1597 4533 4 16 -37 17 -757 17 l-761 0 -9 -22z"/>
                <path d="M3510 4504 c-6 -16 -178 -501 -381 -1079 l-370 -1050 322 -915 c177 -503 336 -946 354 -985 104 -227 257 -376 455 -441 50 -16 108 -18 644 -22 565 -3 588 -3 582 15 -4 10 -363 1026 -798 2258 -434 1232 -792 2242 -794 2244 -2 2 -8 -9 -14 -25z"/>
            </g>
        </svg>
        <span className="hidden sm:inline select-none">MyStore</span>
      </Link>

      {/* Arama ve ikonlar */}
      <div className="flex me-10 md:mx-0 items-center gap-4">
        {/* Arama kutusu */}
        <div className="hidden md:block">
          <Input
            type="text"
            placeholder="Lorem ipsum"
            className="w-64 bg-zinc-100 text-zinc-900 dark:text-white border-1 border-zinc-500 select-none"
          />
        </div>

        {/* Profil ve Sepet */}
        <ThemeToggle />
        <ProfileMenu />
        <CartIcon />
      </div>
    </div>
  );
};
export default Navbar;
