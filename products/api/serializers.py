from rest_framework import serializers
from products.models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # __str__ ile ismini de yazsın
    parent = serializers.StringRelatedField() 
    class Meta:
        model = Category
        exclude = ["slug"]
        read_only_fields = ["id", "parent"]
        
        
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
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["id"]
        