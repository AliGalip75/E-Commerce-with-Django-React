from rest_framework import viewsets, status
from products.models import Product, Category
from products.api.serializers import ProductReadSerializer, ProductWriteSerializer, CategorySerializer
from products.models import FavoriteProduct
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from products.api.filters import ProductFilter
from products.api.filters import ProductSearchFilter
from products.api.pagination import StandardResultsSetPagination

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.order_by("pk")
    filter_backends = [DjangoFilterBackend, ProductSearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    pagination_class = StandardResultsSetPagination
    ordering_fields = ["stock"]
    ordering = ["-id"] #ordering parametresi verilmezse default ordering
    
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
    
    # URL: /api/products/populer/
    @action(detail=False, methods=['get'])
    def populer(self, request):

        # Tüm ürünleri al
        queryset = Product.objects.all()
        
        # Filtrele
        queryset = self.filter_queryset(self.get_queryset())
        
        # En çok satılandan en az satılana göre sırala
        queryset = queryset.order_by('-sold_count')

        # İlk 20 popüler ürünler
        queryset = queryset[:20]

        # Serialize et
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    
    # URL: /api/products/{id}/favorite_toggle/
    @action(detail=True, methods=["POST"], url_path="favorite")
    def favorite_toggle(self, request, pk=None):
        product = self.get_object()
        user = request.user
        
        favorite_item = FavoriteProduct.objects.filter(user=user, product=product)
        if not user:
            return Response({"status" : "Favorilemek için giriş yapiniz"})
        if favorite_item:
            favorite_item.delete()
            return Response({"status": "Ürün favorilerden çikartildi"}, status=status.HTTP_200_OK)
        else:
            FavoriteProduct.objects.create(user=user, product=product)
            return Response({"status": "Ürün favorilere eklendi"}, status=status.HTTP_201_CREATED)
    
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    queryset = Category.objects.filter(is_active=True).prefetch_related('children')   