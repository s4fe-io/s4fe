from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from home.api.v1.categorylist import viewsets

urlpatterns = [
    path('', viewsets.category_list),
    path('<int:pk>', viewsets.category_list),
]

urlpatterns = format_suffix_patterns(urlpatterns)