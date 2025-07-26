from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework import serializers
from ..models import CustomUser


''' Token + RefreshToken + id + email '''
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # username_field = 'email'
    def validate(self, attrs):
        try:
            # Email ile kullanıcı bulunabilir mi kontrolü
            email = attrs.get('email')
            password = attrs.get('password')
            
            if not email or not password:
                raise AuthenticationFailed({
                    'detail': 'Email ve şifre zorunludur.'
                })

            # Kullanıcıyı bul
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                raise AuthenticationFailed({
                    'email': ['Geçersiz e-posta veya şifre.'],
                    'password': ['Geçersiz e-posta veya şifre.']
                })

            if not user.check_password(password):
                raise AuthenticationFailed({
                    'email': ['Geçersiz e-posta veya şifre.'],
                    'password': ['Geçersiz e-posta veya şifre.']
                })

            if not user.is_active:
                raise AuthenticationFailed({'detail': 'Hesabınız devre dışı bırakılmış.'})

            # Kullanıcı doğrulandıysa
            self.user = user  # eklemezsek token oluşturulamaz
            data = super().validate(attrs)  # gelen veriyi kullan
            
            return data
        except AuthenticationFailed as e:
            raise e
        except Exception:
            raise AuthenticationFailed({
                'email': ['Geçersiz e-posta veya şifre.'],
                'password': ['Geçersiz e-posta veya şifre.']
            })
    
''' User görüntüleme '''
class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'phone',
            'age',
            'address',
            'city',
            'country',
            'birth_date',
            'role',
            'profile_picture',
            'email_verified',
            'phone_verified',
            'date_joined',
            'last_updated',
        ]
        read_only_fields = ['email_verified', 'phone_verified', 'date_joined', 'last_updated']

    def get_full_name(self, obj):
        return obj.get_full_name()
    
''' User güncelleme ve kayit '''
class CustomUserCreateUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    age = serializers.IntegerField(required=False)
    address = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    country = serializers.CharField(required=False)
    birth_date = serializers.DateField(required=False)
    profile_picture = serializers.ImageField(required=False)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'first_name',
            'last_name',
            'full_name',
            'email',
            'password',
            'phone',
            'age',
            'address',
            'city',
            'country',
            'birth_date',
            'profile_picture',
        ]
        
    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Bu e-posta adresi zaten kayıtlı.")
        return value
    
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Şifre en az 6 karakter olmalı.")
        return value
    
    def get_full_name(self, obj):
        if hasattr(obj, 'get_full_name'):
            return obj.get_full_name()
        return "Anonim Kullanıcı"


    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)
