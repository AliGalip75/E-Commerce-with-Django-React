from django.contrib import admin
from .models import Category, Product


class ProductInline(admin.StackedInline):
    model = Product
    extra = 3
    fields = ['name', 'price', 'stock', 'description', 'image']  # Gösterilecek alanlar

# verilen category'nin altındaki tüm children'ları dön
def get_descendants(category):
    # Alt kategorileri tutacağımız liste
    descendants = [] 
    # Bu kategorinin doğrudan altındaki çocuklar
    children = category.children.all() 
    
    for child in children:
        # Çocuğu listeye ekle
        descendants.append(child)
        # Çocuğun da altındakileri bul, hepsini ekle
        descendants.extend(get_descendants(child))
    return descendants

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'is_active']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['is_active', 'parent']
    inlines = [ProductInline]  # Kategoriye bağlı ürünleri göster
    
    # Bir kategori kendi alt kategorisini parent olarak seçemesin
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # Eğer düzenlenen alan "parent" ise...
        if db_field.name == "parent":
            # Admin'de düzenlenen nesnenin ID'sini al
            if request.resolver_match.kwargs.get("object_id"):
                try:
                    current_id = int(request.resolver_match.kwargs["object_id"])
                    current_category = Category.objects.get(id=current_id)
                    descendants = get_descendants(current_category)
                    # parent seçim alanındaki listeden "kendini" ve "çocuklarını" çıkar
                    exclude_ids = [current_category.id] + [cat.id for cat in descendants]
                    kwargs["queryset"] = Category.objects.exclude(id__in=exclude_ids)
                except (ValueError, TypeError, Category.DoesNotExist):
                    pass
        # Varsayılan davranışı koru
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'stock', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['-created_at']
    

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)