from rest_framework import viewsets, permissions
from ..models import CartItem
from .serializers import CartItemSerializer
from rest_framework.response import Response
from rest_framework import status

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    
    # Aktif kullanıcının sepetini getir
    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user).order_by('id')
    
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
            serializer.instance = existing_item 
        else:
            serializer.save(user=user)
            
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        instance = serializer.instance

        # Instance'In set edildiğinden emin ol
        if instance is None:
            # Tekrar bul
            instance = CartItem.objects.get(
                user=request.user,
                product=serializer.validated_data['product']
            )

        out = self.get_serializer(instance)
        return Response(out.data, status=status.HTTP_201_CREATED)