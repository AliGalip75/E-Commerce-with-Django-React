from rest_framework import viewsets, permissions
from ..models import CartItem
from .serializers import CartItemSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    
    # Aktif kullanıcının sepetini getir
    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Aynı ürün varsa miktarını artır
        user = self.request.user
        product = serializer.validated_data['product']
        quantity = serializer.validated_data.get('quantity', 1)
        
        # Zaten varsa, sadece miktarını artır
        existing_item = CartItem.objects.filter(user=user, product=product).first()
        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()
        else:
            serializer.save(user=user)