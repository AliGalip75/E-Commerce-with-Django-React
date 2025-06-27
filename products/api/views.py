from rest_framework import viewsets
from products.models import Product, Category
from products.api.serializers import ProductReadSerializer, ProductWriteSerializer, CategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    # Farklı action'lar için farklı serializerlar
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve', 'populer']:
            return ProductReadSerializer
        return ProductWriteSerializer
    
    @action(detail=False, methods=['get'])
    def populer(self, request):
        populer_products = Product.objects.order_by('-sold_count')[:20] # En çok satılan 10 ürün
        serializer = self.get_serializer(populer_products, many=True)
        return Response(serializer.data)
    
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return Category.objects.filter(parent__isnull=True)
    