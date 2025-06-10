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
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    