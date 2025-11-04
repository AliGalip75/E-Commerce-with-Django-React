from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid

# Dosya, MEDIA_ROOT/profile_pics/user_<id>/<new_filename> yoluna kaydedilir
def user_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return f"profile_pics/user_{instance.id}/{new_filename}"

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email zorunlu!")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.username = email
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', CustomUser.Role.ADMIN)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
 
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    
    class Role(models.TextChoices):  # "TextChoices" Django'nun yeni özelliği
        CUSTOMER = "CU", "Müşteri"  # (veritabanı değeri, görünen isim)
        VENDOR = "VE", "Satıcı"
        ADMIN = "AD", "Yönetici"
    
    
    first_name = models.CharField(max_length=80)
    last_name = models.CharField(max_length=80)
    username = models.CharField(
        max_length=150,
        unique=True,
        blank=True,
        null=True
    )
    email = models.EmailField(
        unique=True, 
        verbose_name="E-posta",
        error_messages= {
            'unique' : 'Bu email zaten kullanılıyor',
            'blank': 'Email boş bırakılamaz',
            'invalid' : 'Geçersiz email'
        }
    )
    phone = models.CharField(
        unique=True,
        blank=True, 
        null=True,
        max_length=11
    )
    age = models.PositiveIntegerField(null=True, blank=True)
    address = models.TextField(
        blank=True, 
        null=True, 
        verbose_name="Adres"
    )
    city = models.CharField(
        max_length=50, 
        blank=True, 
        null=True, 
        verbose_name="Şehir"
    )
    country = models.CharField(
        max_length=50, 
        blank=True, 
        null=True, 
        default="Türkiye", 
        verbose_name="Ülke"
    )
    birth_date = models.DateField(
        blank=True, 
        null=True, 
        verbose_name="Doğum Tarihi"
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.CharField(
        max_length=2, # "CU", "VE" gibi 2 karakter       
        choices=Role.choices,
        default=Role.CUSTOMER,
        verbose_name="Kullanıcı Rolü" # Admin panelde görünen isim
    )
    # Dosyalar MEDIA_ROOT + upload_to
    profile_picture = models.ImageField( 
        upload_to=user_directory_path,
        blank=True,
        null=True,
        verbose_name="Profil Fotoğrafı"
    )
    date_joined = models.DateTimeField(
        auto_now_add=True,
        editable=False
    )
    last_updated = models.DateTimeField(
        auto_now=True,
        editable=False
    )
    # Doğrulama
    email_verified = models.BooleanField(
        blank=True,
        default=False
    )
    phone_verified = models.BooleanField(
        blank=True,
        default=False
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    objects = CustomUserManager()
    
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def get_short_name(self):
        return self.first_name
    
    def __str__(self):
        return f"{self.get_full_name()} <{self.email}>"
    
    class Meta:
        verbose_name = "Kullanıcı"
        verbose_name_plural = "Kullanıcılar"
        ordering = ['-date_joined']  # Yeni kayıtlar en üstte
        indexes = [
            models.Index(fields=['role']),  # role aramaları hızlanır
        ]
        db_table = "user"