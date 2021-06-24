import json
import jwt
import requests

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
    MessageSerializer, DeviceSerializer, TransactionsSerializer, ItemInterfaceSerializer
from users.models import User
from django.core.mail import send_mail
from home.models import Item, OTP, Category, Message, DeviceInfo, Transaction, ItemInterface
from  .filters import ItemFilter, CategoryFilter, MessageFilter, ItemInterfaceFilter
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from datetime import timedelta

import logging
from random import randint
from .helpers import sendSMS
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from rest_auth.registration.views import SocialLoginView
from .apple_serializer import AppleSocialLoginSerializer

import csv
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .serializers import *
import shutil
from django.db.models import Count
from django.db.models import Q
from home.api.v1.notifications import push_notification
from fcm_django.models import FCMDevice

logger = logging.getLogger(__name__)


class ItemViewSet(ModelViewSet):

    serializer_class = ItemSerializer
    filter_class = ItemFilter

    def get_queryset(self):
        return Item.objects.filter(user=self.request.user, deleted=False)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        try:
            trans = Transaction(user_from=None, user_to_id=user.id, item_id=serializer.data['id'])
            trans.save()
        except Exception as e:
            print(e)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        if 'user' in self.request.data:
            trans = Transaction(user_from=self.get_object().user, user_to_id=request.data['user'],
                                item_id=self.get_object().pk)
            trans.save()
        return self.update(request, *args, **kwargs)


class CategoryViewSet(ModelViewSet):
    http_method_names = ('get',)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_class = CategoryFilter


class MessageViewSet(ModelViewSet):
    serializer_class = MessageSerializer
    filter_class = MessageFilter
    queryset = Message.objects.all()

    # def get_queryset(self):
    #     return Message.objects.filter(receiver=self.request.user)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(sender=user)


class DeviceViewSet(ModelViewSet):
    queryset = DeviceInfo.objects.all()
    serializer_class = DeviceSerializer


class TransactionsViewSet(ModelViewSet):
    http_method_names = ['get', ]
    queryset = Transaction.objects.all()
    serializer_class = TransactionsSerializer
    permission_classes = [permissions.AllowAny, ]


class ItemInterfaceViewSet(ModelViewSet):
    queryset = ItemInterface.objects.all()
    serializer_class = ItemInterfaceSerializer
    filter_class = ItemInterfaceFilter

    def get_queryset(self):
        return ItemInterface.objects.filter(creator=self.request.user)

    def create(self, request, *args, **kwargs):
        """
        :param request: Request
        :return: Response
        """
        # Prepare variables
        file = request.FILES.get('file')
        tmp_path = os.path.join(settings.MEDIA_ROOT, 'tmp')
        fss = FileSystemStorage(tmp_path)
        file_name = fss.save(file.name, file)
        file_path = fss.path(file_name)
        file_extension = file_name.split('.')[-1]

        # Check extension
        if file_extension not in ['csv']:
            return Response(data=['Unsupported file extension.'], status=status.HTTP_400_BAD_REQUEST)

        fields = ['title', 'serial', 'category', 'desc', 'status',]

        # Read data from uploaded file
        with open(file_path, 'r') as f:
            item_interfaces = []
            reader = csv.reader(f)

            for i, row in enumerate(reader):
                # Get column indexes
                if i == 0:
                    columns = {}
                    for f in fields:
                        if f in row:
                            columns[f] = row.index(f)
                    continue
                if not columns:
                    raise serializers.ValidationError({'Error': 'CSV column error'})

                # Prepare data
                data = {field: row[idx] for field, idx in columns.items()}
                data['creator'] = request.user
                data['key'] = "none"

                serializer = self.get_serializer(data=data)
                if not serializer.is_valid():
                    response_data = {'line': i + 1, 'errors': serializer.errors}
                    return Response(response_data, status.HTTP_400_BAD_REQUEST)
                item_interface = ItemInterface()
                for k, v in data.items():
                    setattr(item_interface, k, v)

                item_serializer = ItemSerializer(data=data, context={'request': request})
                item_interface.is_valid = item_serializer.is_valid()
                item_interface.errors = json.dumps(item_serializer.errors) if not item_interface.is_valid else ''

                item_interfaces.append(item_interface)

            ItemInterface.objects.bulk_create(item_interfaces)

        # Remove uploaded file
        shutil.rmtree(tmp_path)

        return Response(status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        serializer = self.get_serializer(instance)

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

        data = serializer.data
        data['key'] = "none"
        for k in ['id', 'is_valid', 'errors']:
            data.pop(k)

        item_serializer = ItemSerializer(data=data, context={'request': self.request})

        instance = serializer.instance
        instance.is_valid = item_serializer.is_valid()
        instance.errors = json.dumps(item_serializer.errors) if not instance.is_valid else ''
        instance.save()


@api_view(['GET', ])
def copy_data(request):
    fields = ['title', 'serial', 'category', 'desc', 'status', ]

    # Get item interfaces
    item_interfaces = ItemInterface.objects.filter(creator=request.user, is_valid=True)
    for item_interface in item_interfaces:
        # Prepare data
        data = {f: getattr(item_interface, f) for f in fields}
        data['key'] = "none"
        data['user'] = item_interface.creator_id
        item_serializer = ItemSerializer(data=data, context={'request': request})
        if item_serializer.is_valid():
            # Create Item
            added_item = item_serializer.save()
            try:
                trans = Transaction(user_from=None, user_to_id=item_interface.creator_id, item_id=added_item.id)
                trans.save()
            except Exception as e:
                print(e)

            # Delete Item Interface
            item_interface.delete()

        else:
            # Update instance
            item_interface.is_valid = False
            item_interface.errors = item_serializer.errors
            item_interface.save()

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', ])
@permission_classes([permissions.AllowAny])
def get_otp(request):
    if 'phone_number' not in request.data or not request.data['phone_number']:
        return Response(data={"error": "Phone Number not specified!"},
                        status=status.HTTP_400_BAD_REQUEST)

    now = timezone.now()
    phone_number = request.data['phone_number']
    OTP.objects.filter(phone_number=phone_number, created__lte=now - relativedelta(minutes=5)).delete()
    otp = list(OTP.objects.filter(phone_number=phone_number).order_by('created'))
    if len(otp) > 2 and otp[-1].created > (now - relativedelta(minutes=5)):
        return Response(data={"error": "Try again in 5 minutes !!"},
                        status=status.HTTP_400_BAD_REQUEST)
    if os.getenv('BYPASS_OTP', '0') == '1':
        otp = 1111
    else:
        otp = randint(1000, 9999)
    body = "For S4FE account verification, use this code {} .".format(otp)
    OTP.objects.create(otp=otp, phone_number=phone_number)

    if os.getenv('BYPASS_OTP', '0') == '1':
        logger.info(body)
    else:
        sendSMS(phone_number, body)
    return Response(otp)


@api_view(['POST',])
def get_item_status(request):
    if 'key' not in request.data or not request.data['key']:
        return Response(data={"error": "Key not specified!"},
                        status=status.HTTP_400_BAD_REQUEST)
    your_device = False
    item = Item.objects.filter(key=request.data['key'], deleted=False)

    if len(item) == 0:
        return Response(data={"status": "Key not found !!"},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        if request.user == item[0].user:
            your_device = True
        return_obj = {
           "user": item[0].user.id,
           "your_device": your_device,
           "status": item[0].status
        }
        return Response(return_obj)


@api_view(['POST', ])
@permission_classes([permissions.AllowAny])
def item_transfer(request):
    if 'item' not in request.data or not request.data['item']:
        return Response(data={"error": "Item id not specified!"},
                        status=status.HTTP_400_BAD_REQUEST)
    if 'user' not in request.data or not request.data['user']:
        return Response(data={"error": "User unique identifier not specified!"},
                        status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(unique_identifier=request.data['user']).first()
    if not user:
        return Response(data={"error": "Unknown user!"},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        item = Item.objects.get(id=request.data['item'], deleted=False)
        if not item:
            return Response(data={"error": "Unknown item!"},
                            status=status.HTTP_400_BAD_REQUEST)
        if item.user == user:
            return Response(data={"error": "Item is already property of user : " + str(user.unique_identifier)},
                            status=status.HTTP_400_BAD_REQUEST)
        item.user = user
        item.save()
        trans = Transaction(user_from=request.user, user_to_id=user.id,
                            item_id=request.data['item'])
        trans.save()
        title = "New item received"

        try:
            devices = FCMDevice.objects.filter(user=user)
            a = devices.send_message(title=title, body=item.title, data={"item_id": item.id})
            print(a)
        except Exception as e:
            print(e)

        return Response(data={"Status": "OK!"},
                        status=status.HTTP_200_OK)


@api_view(['GET',])
@permission_classes([permissions.AllowAny])
def search_by_serial(request):
    if 'serial' not in request.GET:
        return Response(data={"error": "Serial not specified!"},
                        status=status.HTTP_400_BAD_REQUEST)

    item = Item.objects.filter(serial=request.GET['serial'], deleted=False)

    if len(item) == 0:
        return Response(data={"status": "Item not found !!"},
                        status=status.HTTP_400_BAD_REQUEST)
    else:
        return_obj = {
           "title": item[0].title,
           "user_id": item[0].user_id,
           "status": item[0].get_status_display()
        }
        return Response(return_obj)


@api_view(['GET',])
@permission_classes([permissions.IsAuthenticated])
def messages_by_users(request):
    user = request.user

    messages_sent = Message.objects.filter(sender=user)
    messages_received = Message.objects.filter(receiver=user)

    tmp_arr = []
    return_arr = []

    for message in messages_sent:
        if message.receiver.username not in tmp_arr:
            print(message.receiver.username)
            tmp_arr.append(message.receiver.username)

    for message in messages_received:
        if message.sender.username not in tmp_arr:
            print(message.sender.username)
            tmp_arr.append(message.sender.username)

    for a in tmp_arr:
        unread_messages = Message.objects.filter(receiver=user, sender__username=a, is_read=False).count()
        user_id = User.objects.filter(username=a).first()
        return_obj = {
           "user_id": user_id.id,
           "user": user_id.first_name + ' ' + user_id.last_name,
           "unread": unread_messages
        }
        return_arr.append(return_obj)

    return Response(return_arr)



@api_view(['GET',])
@permission_classes([permissions.IsAuthenticated])
def messages_within_topic(request):
    if 'user_id' not in request.GET:
        return Response(data={"error": "User not specified!"},
                        status=status.HTTP_400_BAD_REQUEST)

    user = request.user

    messages = Message.objects.filter(Q(sender=user, receiver_id=request.GET['user_id']) |
                                           Q(sender_id=request.GET['user_id'], receiver=user)).order_by('-created')

    return_arr = []

    for message in messages:
        return_obj = {
           "user_id": message.sender.id,
           "user": message.sender.first_name + ' ' + message.sender.last_name,
           "date_time": message.created,
           "message": message.content
        }
        return_arr.append(return_obj)

    return Response(return_arr)


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

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    callback_url = getattr(settings, 'API_APPLE_CALLBACK_URL')
    client_class = AppleOAuth2Client
    serializer_class = AppleSocialLoginSerializer