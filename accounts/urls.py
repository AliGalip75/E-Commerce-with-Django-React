
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomTokenObtainPairView,
    CookieTokenRefreshView,
    CustomUserViewSet,
    LogoutView,
)
from rest_framework_simplejwt.views import TokenVerifyView

# Router ile ViewSet bağlama
router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')

urlpatterns = [
    # JWT token işlemleri
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain'),
    path('token/logout/', LogoutView.as_view(), name='token_delete'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/logout/', LogoutView.as_view(), name='token_logout'),

    # ViewSet için router
    path('', include(router.urls)),
]