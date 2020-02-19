import json

from django import apps
from django.core.management import call_command

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from home.api.v1.serializers import SignupSerializer, UserSerializer
from users.models import User
from django.core.mail import send_mail


class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ['post']


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""
    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({'token': token.key, 'user': user_serializer.data})



