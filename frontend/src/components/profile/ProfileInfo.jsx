import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

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

    if (!orders.length) {
      return <p className="text-muted-foreground">Henüz siparişiniz yok.</p>;
    }

    return (
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
