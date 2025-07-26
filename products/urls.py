from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api.views import ProductViewSet, CategoryViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'favorites', FavoriteViewSet, basename="favorite")

urlpatterns = [
    path("", include(router.urls))
]