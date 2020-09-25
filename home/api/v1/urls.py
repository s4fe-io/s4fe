from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls import url

from home.api.v1.viewsets import SignupViewSet, LoginViewSet, ItemViewSet, CategoryViewSet, MessageViewSet, get_otp,\
    DeviceViewSet, get_item_status, TransactionsViewSet

router = DefaultRouter()
router.register('signup', SignupViewSet, basename='signup')
router.register('login', LoginViewSet, basename='login')
router.register('items', ItemViewSet, basename='items')
router.register('categories', CategoryViewSet, basename='categories')
router.register('messages', MessageViewSet, basename='messages')
router.register('device', DeviceViewSet, basename='device')
router.register('transactions', TransactionsViewSet)

urlpatterns = [
    path("", include(router.urls)),
    url(r'get-otp', get_otp),
    url(r'item-status', get_item_status),
]
