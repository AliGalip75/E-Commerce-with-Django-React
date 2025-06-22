import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";


const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="relative text-zinc-800 dark:text-white">
      <FiShoppingCart size={20} />
      {cartCount > 0 && (
        <span className="absolute -top-5 -right-6 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full pointer-events-none select-none">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;