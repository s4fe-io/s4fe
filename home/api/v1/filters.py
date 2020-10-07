from django_filters.rest_framework import filterset, filters
from home.models import Item, OTP, Category, Message, ItemInterface


class ItemFilter(filterset.FilterSet):

    class Meta:
        model = Item
        fields = '__all__'


class CategoryFilter(filterset.FilterSet):
    class Meta:
        model = Category
        fields = '__all__'


class MessageFilter(filterset.FilterSet):
    class Meta:
        model = Message
        fields = '__all__'


class ItemInterfaceFilter(filterset.FilterSet):
    class Meta:
        model = ItemInterface
        fields = '__all__'

