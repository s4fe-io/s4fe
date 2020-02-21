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
import os
from home.api.v1.serializers import SignupSerializer, UserSerializer, ItemSerializer, CategorySerializer,\
    MessageSerializer, DeviceSerializer
from users.models import User
from django.core.mail import send_mail
from home.models import Item, OTP, Category, Message, DeviceInfo
from  .filters import ItemFilter, CategoryFilter, MessageFilter
from django.utils import timezone
from dateutil.relativedelta import relativedelta
import logging
from random import randint
from .helpers import sendSMS
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


logger = logging.getLogger(__name__)


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_class = ItemFilter


class CategoryViewSet(ModelViewSet):
    http_method_names = ('get',)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_class = CategoryFilter


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_class = MessageFilter

    def get_queryset(self):
        return Message.objects.filter(receiver=self.request.user)


class DeviceViewSet(ModelViewSet):
    queryset = DeviceInfo.objects.all()
    serializer_class = DeviceSerializer


@api_view(['POST',])
@permission_classes([permissions.AllowAny])
def get_otp(request):
    if 'phone_number' not in request.data or not request.data['phone_number']:
        return Response(data={"error": "Phone Number not specified!"},
                        status=status.HTTP_400_BAD_REQUEST)

    now = timezone.now()
    phone_number = request.data['phone_number']
    otp = list(OTP.objects.filter(phone_number=phone_number).order_by('created'))
    if len(otp) > 2 and otp[-1].created > (now - relativedelta(minutes=5)):
        return Response(data={"error": "Try again in 5 minutes !!"},
                        status=status.HTTP_400_BAD_REQUEST)
    if os.getenv('BYPASS_OTP', '0') == '1':
        otp = 1111
    else:
        otp = randint(1000, 9999)
    body = "Use {} Code to Verify your Account".format(otp)
    OTP.objects.create(otp=otp, phone_number=phone_number)

    if os.getenv('BYPASS_OTP', '0') == '1':
        logger.info(body)
    else:
        sendSMS(phone_number, body)
    return Response(otp)


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


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

