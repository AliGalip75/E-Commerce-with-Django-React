from rest_framework import viewsets, permissions, status
from products.models import Product, Category
from products.api.serializers import ProductReadSerializer, ProductWriteSerializer, CategorySerializer
from products.models import FavoriteProduct
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    # Farklı action'lar için farklı serializerlar
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve', 'populer']:
            return ProductReadSerializer
        elif self.action == 'favorite_toggle':
            return None
        return ProductWriteSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'populer']:
            return [AllowAny()]
        elif self.action == 'favorite_toggle':
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]
    
    @action(detail=False, methods=['get'])
    def populer(self, request):
        populer_products = Product.objects.order_by('-sold_count')[:20] # En çok satılan 20 ürün
        serializer = self.get_serializer(populer_products, many=True)
        return Response(serializer.data)
    
    # URL: /api/products/{id}/favorite_toggle/
    @action(detail=True, methods=["POST"], url_path="favorite")
    def favorite_toggle(self, request, pk=None):
        product = self.get_object()
        user = request.user
        
        favorite_item = FavoriteProduct.objects.filter(user=user, product=product)
        
        if favorite_item:
            favorite_item.delete()
            return Response({"status": "Ürün favorilerden çikartildi"}, status=status.HTTP_200_OK)
        else:
            FavoriteProduct.objects.create(user=user, product=product)
            return Response({"status": "Ürün favorilere eklendi"}, status=status.HTTP_201_CREATED)
    
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Category.objects.filter(parent__isnull=True)
    