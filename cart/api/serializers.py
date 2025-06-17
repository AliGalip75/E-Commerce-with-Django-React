from rest_framework import serializers
from ..models import CartItem
from products.models import Product

class ProductMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductMiniSerializer(read_only=True) # Get için
    product_id = serializers.PrimaryKeyRelatedField( # Post için
        queryset=Product.objects.all(),
        write_only=True,
        source="product"  # modelde product alanını doldurur
    )
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']
