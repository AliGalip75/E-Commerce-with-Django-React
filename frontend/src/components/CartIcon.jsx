import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from "@/components/ui/badge"

const CartIcon = () => {
  const { cartCount } = useCart();
  return (
    <div className="relative">
      <Link to="/cart">
        <FiShoppingCart 
          size={20} 
          className={cartCount > 0 ? "animate-pulse" : ""} 
        />
      </Link>
      {cartCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-6 -right-6 pointer-events-none"
        >
          {cartCount}
        </Badge>
      )}
    </div>
  );
};

export default CartIcon;