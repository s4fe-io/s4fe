from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
from home.models import Category
from home.api.v1.categorylist.serializers import CategoryListSerializer


@api_view(['GET', ])
@permission_classes([permissions.IsAuthenticated])
def category_list(request, pk=None):
    categoryId = 'categoryId' in request.GET and request.GET['categoryId'] or pk
    foundCategories = Category.objects.filter(Q(parent=categoryId)).order_by('-title')

    serializer = CategoryListSerializer(foundCategories, many=True, context={"request": request})

    return Response(serializer.data)