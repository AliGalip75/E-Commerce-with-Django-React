from django.db import models
import uuid
from PIL import Image

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)
    # Self-Referencing ForeignKey
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )
    
    class Meta:
        verbose_name = "Kategori"
        verbose_name_plural = "Kategoriler"
        db_table = "category"

    def __str__(self):
        full_path = [self.name]
        k = self.parent
        while k is not None:
            full_path.append(k.name)
            k = k.parent
        return " -> ".join(full_path[::-1])
    
    
def product_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return f"product_pics/product_{instance.id}/{new_filename}"
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products'
    )
    stock = models.PositiveIntegerField()
    image = models.ImageField(
        upload_to=product_directory_path,
        null=True,
        verbose_name='Ürün Resmi'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Ürün görseli kaydedilmeden önce ölçeklendirme
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        if self.image:
            img = Image.open(self.image.path)
            if img.width > 800 or img.height > 800:
                output_size = (800, 800)
                img.thumbnail(output_size)
                img.save(self.image.path)
    
    class Meta:
        verbose_name = "Ürün"
        verbose_name_plural = "Ürünler"
        ordering = ['-created_at']  
        indexes = [
            models.Index(fields=['price', 'stock']),  
        ]
        db_table = "product"