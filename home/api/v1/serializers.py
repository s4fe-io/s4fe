from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.models import TokenModel
from home.models import Item, OTP, Category, Message, DeviceInfo


User = get_user_model()


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('title', 'key', 'category', 'desc', 'status', 'created')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('created', 'sender', 'receiver', 'content', 'is_read')


class DeviceSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = DeviceInfo
        fields = ('id', 'user', 'device_id', 'push_token', 'is_active')


class MyRegisterSerializer(RegisterSerializer):
    phone_number = serializers.CharField()
    otp = serializers.CharField()

    def validate_otp(self, otp):
        temp_otp = OTP.objects.filter(phone_number=self.initial_data.get('phone_number', '')).order_by(
            '-created').first().otp
        req_otp = self.initial_data.get('otp', '')
        if temp_otp != req_otp:
            raise serializers.ValidationError("Wrong OTP !")
        else:
            return otp

    def get_cleaned_data(self):
        super(MyRegisterSerializer, self).get_cleaned_data()
        return {
            'name': self.validated_data.get('name', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
            'otp': self.validated_data.get('otp', '')
        }


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    id = serializers.SerializerMethodField('get_id')
    email = serializers.SerializerMethodField('get_email')
    first_name = serializers.SerializerMethodField('get_first_name')
    last_name = serializers.SerializerMethodField('get_last_name')
    email = serializers.SerializerMethodField('get_email')
    phone_number = serializers.SerializerMethodField('get_phone_number')

    def get_id(self, obj):
        return obj.user.id

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_email(self, obj):
        return obj.user.email

    def get_phone_number(self, obj):
        return obj.user.phone_number

    class Meta:
        model = TokenModel
        fields = ('key', 'id', 'first_name', 'last_name', 'email', 'phone_number')


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            username=generate_unique_username([
                validated_data.get('name'),
                validated_data.get('email'),
                'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm
