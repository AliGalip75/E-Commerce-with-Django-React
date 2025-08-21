from rest_framework import serializers
from products.models import Product, Category, FavoriteProduct

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    class Meta:
        model = Category
        exclude = ["cached_path"]
        read_only_fields = ["id", "parent"]
        
    def get_children(self, obj):
        # Aktif alt kategorileri getir
        children = obj.children.filter(is_active=True)
        return CategorySerializer(children, many=True).data
        
        
''' Product Serializer - Write (create, update) '''
class ProductWriteSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        required=True,
        allow_null=True
    )
    class Meta:
        model = Product
        fields = '__all__'
        
        
''' Product Serializer - Read (list, retrieve) '''        
class ProductReadSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    is_favorited = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = "__all__"
        
    def get_is_favorited(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.favorited_by.filter(user=user).exists()
        return False
        
        
class FavoriteWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteProduct
        fields = ['product']
        
        
class FavoriteReadSerializer(serializers.ModelSerializer):
    product = ProductReadSerializer(read_only=True)
    class Meta:
        model = FavoriteProduct
        fields = ["id", "product", "created_at"]