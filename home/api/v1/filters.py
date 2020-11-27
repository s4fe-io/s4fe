from django_filters.rest_framework import filterset, filters
from home.models import Item, OTP, Category, Message, ItemInterface
from django.db.models import Q

class ItemFilter(filterset.FilterSet):

    class Meta:
        model = Item
        fields = '__all__'


class CategoryFilter(filterset.FilterSet):
    class Meta:
        model = Category
        fields = '__all__'


class MessageFilter(filterset.FilterSet):
    user = filters.CharFilter(method='name_filter')

    class Meta:
        model = Message
        fields = '__all__'

    @staticmethod
    def name_filter(queryset, name, tmp_name):
        return queryset.filter(Q(sender=tmp_name) | Q(receiver=tmp_name))


class ItemInterfaceFilter(filterset.FilterSet):
    class Meta:
        model = ItemInterface
        fields = '__all__'

