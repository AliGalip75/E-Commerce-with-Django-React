from rest_framework import viewsets
from products.models import Product, Category
from products.api.serializers import ProductReadSerializer, ProductWriteSerializer, CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    # Farklı action'lar için farklı serializerlar
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ProductReadSerializer
        return ProductWriteSerializer
    
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return Category.objects.filter(parent__isnull=True)
    