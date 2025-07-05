import uuid
from django.db import models
from accounts.models import CustomUser
from products.models import Product

class Order(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = "Pending"
        CONFIRMED = "Confirmed"
        CANCELLED = "Cancelled"
    
    order_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4
    )
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    status = models.CharField(
        max_length=10,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING
    )
    products = models.ManyToManyField(Product, through='OrderItem', related_name='orders') # Şart değildi fakat ilişkiyi daha kolay yönetmek için yararlı
    
    class Meta:
        ordering = ['-order_id']
        
    def __str__(self):
        return f"Sipariş #{self.order_id} - {self.user.username}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True
    ) # Ürün silince bile sipariş silinmesin
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )  # sabitlenmiş fiyat
    
    @property
    def item_subtotal(self):
        return self.product.price * self.quantity # Siparişteki her ürünün toplam(price * quantity) fiyatı
    
    def __str__(self):
        return f"{self.quantity} adet {self.product.name} in Order #{self.order.order_id}"
  