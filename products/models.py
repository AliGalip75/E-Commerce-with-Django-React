from django.db import models
import uuid
from PIL import Image
import os

def category_thumbnail_path(instance, filename):
    ext = filename.split('.')[-1]
    return f"category_pics/category_{instance.name}/thumb.{ext}"

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)
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
    
    
def product_thumbnail_path(instance, filename):
    ext = filename.split('.')[-1]
    return f"product_pics/product_{instance.uuid}/thumb.{ext}"

def product_gallery_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return f"product_pics/product_{instance.product.uuid}/gallery/{new_filename}"

    
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, null=False, unique=True)
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
        upload_to=product_thumbnail_path,
        null=True,
        verbose_name='Ürün Kapak Resmi'
    )
    sold_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Ürün görseli kaydedilmeden önce ölçeklendirme
    def save(self, *args, **kwargs):
        if self.pk:
            try:
                old = Product.objects.get(pk=self.pk)
                if old.image and self.image and old.image.name != self.image.name:
                    if os.path.isfile(old.image.path):
                        os.remove(old.image.path)
            except Product.DoesNotExist:
                pass
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

    def __str__(self):
        return f'{self.name}'
        
# Her ürün için birden fazla görsel
class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to=product_gallery_path)
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - Image {self.id}"

    def save(self, *args, **kwargs):
        # Eğer yeni kayıt ekleniyorsa (güncelleme değilse)
        if not self.pk and self.product.images.count() >= 4:
            raise ValueError("En fazla 4 galeri görseli eklenebilir.")
        
        super().save(*args, **kwargs)

        if self.image:
            img = Image.open(self.image.path)
            if img.width > 800 or img.height > 800:
                output_size = (800, 800)
                img.thumbnail(output_size)
                img.save(self.image.path)
    
    class Meta:
        db_table = "product_images"
        verbose_name = "Ürün Resmi"
        verbose_name_plural = "Ürün Resimleri"