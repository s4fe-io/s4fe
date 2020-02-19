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

User = get_user_model()


class MyRegisterSerializer(RegisterSerializer):

    def get_cleaned_data(self):
        super(MyRegisterSerializer, self).get_cleaned_data()
        return {
            'name': self.validated_data.get('name', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', '')
        }


class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    id = serializers.SerializerMethodField('get_id')
    name = serializers.SerializerMethodField('get_name')
    email = serializers.SerializerMethodField('get_email')

    def get_id(self, obj):
        return obj.user.id

    def get_name(self, obj):
        return obj.user.name

    def get_email(self, obj):
        return obj.user.email

    class Meta:
        model = TokenModel
        fields = ('key', 'id', 'name', 'email')


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
