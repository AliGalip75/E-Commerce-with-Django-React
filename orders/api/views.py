from rest_framework import viewsets, permissions, serializers
from orders.models import Order
from .serializers import OrderSerializer
from cart.models import CartItem
from django.db import transaction
from rest_framework import filters

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        with transaction.atomic():
            # Kullanıcıyı al
            user = self.request.user
            # Kullanıcıya göre sepetteki ürünleri al
            cart_items = CartItem.objects.filter(user=user)

            if not cart_items.exists():
                raise serializers.ValidationError("Sepet boş.")

            total = sum(item.product.price * item.quantity for item in cart_items)
            order = serializer.save(user=user, total_price=total)

            for item in cart_items:
                order.items.create(
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )
                item.product.sold_count += item.quantity
                item.product.save()

            cart_items.delete()