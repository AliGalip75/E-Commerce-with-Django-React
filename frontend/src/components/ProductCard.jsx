import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md bg-white dark:bg-zinc-900">
      {/* Ürün resmi */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <CardContent className="p-4 space-y-1">
        {/* Kategori adı */}
        <p className="text-xs text-muted-foreground">
          {product.category?.name || "Kategori yok"}
        </p>

        {/* Ürün adı */}
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>

        {/* Açıklama */}
        {product.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Fiyat */}
        <p className="text-base font-bold">{parseFloat(product.price).toFixed(2)} ₺</p>
      </CardContent>

      <CardFooter className="p-4">
        <Button className="w-full">Sepete Ekle</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
