from django.core.management.base import BaseCommand
from faker import Faker
from django.utils.text import slugify
import random
from decimal import Decimal
from products.models import Category, Product, ProductImage

class Command(BaseCommand):
    help = 'Veritabanına örnek kategori ve ürün verileri ekler.'

    def handle(self, *args, **options):
        
        # Faker nesnesini oluşturun
        fake = Faker('tr_TR') 

        # Mevcut verileri temizle
        ProductImage.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        self.stdout.write(self.style.WARNING('Mevcut tüm Kategori ve Ürün verileri silindi.'))

        # Ana (parent) kategorileri oluştur
        parent_categories_names = ['Elektronik', 'Giyim', 'Ev Eşyaları', 'Kitap', 'Kozmetik']
        parent_categories = []
        for name in parent_categories_names:
            category, _ = Category.objects.get_or_create(
                name=name,
                slug=slugify(name),
                is_active=True,
                parent=None
            )
            parent_categories.append(category)

        self.stdout.write(self.style.SUCCESS(f'{len(parent_categories)} adet ana kategori oluşturuldu.'))

        # Alt kategorileri oluştur
        sub_categories = []
        for parent in parent_categories:
            for _ in range(3):
                sub_name = f"{fake.word()}"
                category, _ = Category.objects.get_or_create(
                    name=sub_name,
                    slug=slugify(sub_name),
                    is_active=True,
                    parent=parent
                )
                sub_categories.append(category)

        self.stdout.write(self.style.SUCCESS(f'{len(sub_categories)} adet alt kategori oluşturuldu.'))

        # Toplam 100 adet rastgele ürün oluştur
        all_categories = list(Category.objects.all())
        products_to_create = []
        
        for i in range(100):
            # Rastgele bir kategori seç
            category = random.choice(all_categories)
            
            # Rastgele fiyat, stok ve satış sayısı belirle
            price = Decimal(random.randint(10, 5000)) + Decimal(random.choice([0.99, 0.50, 0.25]))
            stock = random.randint(0, 200)
            sold_count = random.randint(0, stock + 50)
            
            # Ürün nesnesini oluştur
            product = Product(
                name=fake.sentence(nb_words=4),
                description=fake.paragraph(nb_sentences=5),
                price=price,
                category=category,
                stock=stock,
                sold_count=sold_count,
            )
            products_to_create.append(product)
            
        # Toplu şekilde veritabanına kaydet (daha hızlıdır)
        Product.objects.bulk_create(products_to_create)

        self.stdout.write(self.style.SUCCESS(f'{len(products_to_create)} adet ürün başarıyla oluşturuldu.'))
        self.stdout.write(self.style.SUCCESS('Örnek veri ekleme işlemi tamamlandı! 🎉'))