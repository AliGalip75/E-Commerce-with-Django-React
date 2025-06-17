from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # Yeni boş form gösterme
    readonly_fields = ('product', 'quantity', 'price')
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username',)
    inlines = [OrderItemInline]
    readonly_fields = ('user', 'total_price', 'created_at')
