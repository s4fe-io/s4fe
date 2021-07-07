from rest_framework import serializers

from home.models import Category

class ChildCategorySerializer(serializers.ModelSerializer):
    parent_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(),source='parent.id')

    class Meta:
        model = Category
        fields = ('id','title','parent_id', 'img')

class CategoryListSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    img = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'title', 'children', 'img')

    def get_children(self, instance):
        children = instance.children.all().order_by('title')
        return ChildCategorySerializer(children, many=True).data

    def get_img(self, instance):
        request = self.context.get('request')
        if instance.img:
            img_url = instance.img.url
            print(img_url, request.build_absolute_uri(img_url))
            return request.build_absolute_uri(img_url)
        return None