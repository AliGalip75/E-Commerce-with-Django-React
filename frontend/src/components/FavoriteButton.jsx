import useAxios from "@/hooks/useAxios"; // Güvenli API istekleriniz için useAxios
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoriteButton = ({ productId, isFavorited, setIsFavorited }) => {
    const axios = useAxios();

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();
        try {

            if (isFavorited) {
                // Favorilerden çıkarma işlemi
                await axios.post(`/products/${productId}/favorite/`);
                setIsFavorited(false);
                toast.success("Ürün favorilerden çıkarıldı!");
            } else {
                // Favorilere ekleme işlemi
                await axios.post(`/products/${productId}/favorite/`);
                setIsFavorited(true);
                toast.success("Ürün favorilere eklendi!");
            }
        } catch (err) {
            console.error("Favori işlemi başarısız:", err);
            toast.error("Favori işlemi sırasında bir hata oluştu.");
        }
    };

  return (
    <button
      onClick={handleToggleFavorite}
      className="absolute top-10 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md transition-colors"
    >
      {isFavorited ? (
        <FaHeart className="text-red-500" size={20} /> // Favoride ise dolu kalp
      ) : (
        <FaRegHeart className="text-gray-400 hover:text-red-500" size={20} /> // Favoride değilse boş kalp
      )}
    </button>
  );
}

export default FavoriteButton;