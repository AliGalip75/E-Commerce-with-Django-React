from django.db import models
from products.models import Product
from accounts.models import CustomUser


class CartItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'product') # Aynı kullanıcı aynı ürünü birden fazla kez eklemesin, quantity'yi artırsın
        db_table = 'cart'
        managed = True
        verbose_name = 'Sepet'
        verbose_name_plural = 'Sepetler'
    
    def __str__(self):
        return f"{self.user.username} - {self.product.name} <{self.quantity}> adet"