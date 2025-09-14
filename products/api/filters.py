from django_filters.rest_framework import filters, FilterSet
from rest_framework.filters import SearchFilter
from products.models import Product

class ProductFilter(FilterSet):
    price_min = filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = filters.NumberFilter(field_name="price", lookup_expr="lte")
    price_range = filters.CharFilter(method='filter_by_price_range')
    category = filters.CharFilter(field_name="category__id", lookup_expr="exact")

    class Meta:
        model = Product
        fields = ['price_min', 'price_max', 'category']
    
    # /api/products/?price_range=50,200
    def filter_by_price_range(self, queryset, name, value):
        min_price, max_price = map(float, value.split(','))
        return queryset.filter(price__gte=min_price, price__lte=max_price)
    
    
class ProductSearchFilter(SearchFilter):
    
    def get_search_fields(self, view, request):
        return super().get_search_fields(view, request)