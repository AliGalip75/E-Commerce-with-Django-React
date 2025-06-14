from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser
from django.contrib.auth.models import Group
from .forms import UserChangeForm, UserCreationForm

class CustomUserAdmin(BaseUserAdmin):
    model = CustomUser
    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ("email", "first_name", "last_name", "role", "is_active", "is_staff", "date_joined")
    list_filter = ("role", "is_active", "is_staff", "email_verified", "phone_verified")
    search_fields = ("email", "first_name", "last_name", "phone")
    ordering = ("-date_joined",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Kişisel Bilgiler", {"fields": ("first_name", "last_name", "username", "phone", "birth_date", "address", "city", "country", "profile_picture")}),
        ("Roller ve Durum", {"fields": ("role", "is_active", "is_staff", "is_superuser")}),
        ("Doğrulama", {"fields": ("email_verified", "phone_verified")}),
        ("Tarihler", {"fields": ("last_login", "date_joined", "last_updated")}),
        ("Yetkiler", {"fields": ("groups", "user_permissions")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "first_name", "last_name", "username", "phone", "password1", "password2", "role", "is_active", "is_staff", "is_superuser"),
        }),
    )

    readonly_fields = ("date_joined", "last_updated", "last_login", "birth_date")
    
    
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)