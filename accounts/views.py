from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import CustomUser
from .api.serializers import CustomUserCreateUpdateSerializer, CustomUserSerializer, MyTokenObtainPairSerializer
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework import status
from django.conf import settings
from .api.permissions import IsOwner
from rest_framework_simplejwt.exceptions import TokenError

# Giriş - access dön, refresh'i cookie'ye kaydet
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        # Başarılı yanıt
        response = Response(serializer.validated_data, status=status.HTTP_200_OK)
        
        # Cookie ayarları
        refresh_token = serializer.validated_data.get('refresh')
        access_token = serializer.validated_data.get('access')
        
        if refresh_token:
            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure= not settings.DEBUG,
                samesite='Lax',
                path='/',
                max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()
            )
            # Refresh token'ı yanıttan kaldır
            response.data.pop('refresh', None)
        return response


# Çıkış – refresh cookie’sini sil
class LogoutView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        refreshToken = request.COOKIES.get('refresh_token')
        response = Response({"message": "Başaryıla çıkış yaptınız!"}, status=status.HTTP_200_OK)
        response.delete_cookie("refresh_token", path="/")
        
        if refreshToken:
            try:
                token = RefreshToken(refreshToken)
                token.blacklist()
            except TokenError:
                pass
        
        return response


# Tarayıcı cookie'sindeki refresh ile access'i yenile
class CookieTokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            return Response({'error': 'Refresh token bulunamadı'}, status=401)
        try:
            token = RefreshToken(refresh_token)
            access = str(token.access_token)
            return Response({'access': access})
        except TokenError as e:
            return Response({'error': str(e)}, status=401)
        
# /api/accounts/users/   
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    
    def get_serializer_class(self):
        # profile ve update_profile için 
        if self.action in ['profile', 'update_profile']:
            return CustomUserCreateUpdateSerializer
        # list, retrieve için:
        elif self.action in ['list', 'retrieve']:
            return CustomUserSerializer
        # create, update, patch ve delete için
        return CustomUserCreateUpdateSerializer

    # Action'a göre özel permission 
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        elif self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['profile', 'update_profile']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]

    # Aktif kullanıcının bilgilerini getir
    @action(detail=False, methods=["get"])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    # Aktif kullanıcının belirli özelliklerini güncelle
    @action(detail=False, methods=["patch"], url_path='profile/update')
    def update_profile(self, request):
        serializer = self.get_serializer(request.user, data=request.data, partial=True) # Sadece değişen kısımları güncelle
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
