import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const ProfileInfo = ({ profile, activeSection }) => {
  const { orders, loading } = useOrders(activeSection === "orders");

  const renderOrders = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <>
        {!orders.length ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center bg-gradient-to-b from-gray-100 to-gray-500 dark:from-zinc-950 dark:to-zinc-900 p-6 rounded-lg animate-slideIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 mb-4 text-zinc-950 dark:text-zinc-50 transition-transform hover:scale-105"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Henüz Siparişiniz Yok
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
              Sepetiniz boş görünüyor! Hemen mağazamızı ziyaret ederek favori ürünlerinizi keşfedin.
            </p>
            <Link to="/" 
              className="inline-flex items-center px-5 py-3 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950
              font-medium rounded-full hover:bg-zinc-900 transition-colors duration-200">
              <p className="font-normal">Şimdi Alışveriş Yap</p>
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-6 mb-5">
            {orders.map((order) => (
              <Card key={order.order_id} className="dark:bg-zinc-900 dark:shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Sipariş #{order.order_id.slice(0, 5)}</CardTitle>
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <p>Tarih: {new Date(order.created_at).toLocaleString()}</p>
                    <p>Alıcı: {order.user_full_name}</p>
                    <p>Tutar: {order.total_price} ₺</p>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div key={`${order.order_id}-${item.product}`} className="flex justify-between items-center border p-2 rounded-md">
                      <div className="space-y-1">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">Adet: {item.quantity}</p>
                      </div>
                      <img
                        src={item.product_image}
                        alt="Ürün görseli"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return renderOrders();
      case "reviews":
        return <p>Değerlendirmeleriniz burada listelenecek.</p>;
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
