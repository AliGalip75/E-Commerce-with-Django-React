from rest_framework import serializers
from orders.models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.ImageField(source='product.image', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['product', 'product_name', 'product_image', 'quantity', 'item_subtotal', 'price']
        
    
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True) # Items modeldeki related_name'den geliyor!
    user_full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ['order_id', 'user', 'user_full_name', 'created_at', 'total_price', 'status', 'items']
        read_only_fields = ['user', 'created_at', 'total_price']
        
    def get_user_full_name(self, obj):
        user = getattr(obj, "user", None)

        if not user or not hasattr(user, "get_full_name"):
            return "Anonim Kullanıcı"

        return user.get_full_name() or user.get_username()
