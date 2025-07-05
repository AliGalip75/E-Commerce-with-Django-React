from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from accounts.models import CustomUser
from products.models import Product

class ProductAPITests(APITestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(email="test@mail.com", password="1234test")
        self.client.force_authenticate(user=self.user)
        self.product = Product.objects.create(name="Test Ürün", price=50, stock=10)

    def test_product_list(self):
        url = reverse("product-list")  # routers ile oluşan URL name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_product_detail(self):
        url = reverse("product-detail", args=[self.product.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Ürün")
