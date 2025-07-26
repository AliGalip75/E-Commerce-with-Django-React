from rest_framework import viewsets, permissions, status
from products.models import Product, Category
from products.api.serializers import ProductReadSerializer, ProductWriteSerializer, CategorySerializer, FavoriteWriteSerializer, FavoriteReadSerializer
from products.models import Favorite
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    # Farklı action'lar için farklı serializerlar
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve', 'populer']:
            return ProductReadSerializer
        return ProductWriteSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'populer']:
            return [AllowAny()]
        else:
            return [IsAdminUser()]
    
    @action(detail=False, methods=['get'])
    def populer(self, request):
        populer_products = Product.objects.order_by('-sold_count')[:20] # En çok satılan 20 ürün
        serializer = self.get_serializer(populer_products, many=True)
        return Response(serializer.data)
    
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Category.objects.filter(parent__isnull=True)
    

class FavoriteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return FavoriteReadSerializer
        return FavoriteWriteSerializer
    
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    @action(detail=False, methods=["post"], url_path="toggle/(?P<product_id>[^/.]+)")
    def toggle(self, request, product_id=None):
        user = request.user
        favorite, created = Favorite.objects.get_or_create(user=user, product_id=product_id)
        if not created:
            favorite.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_201_CREATED)