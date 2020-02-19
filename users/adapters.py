from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.http import HttpRequest


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def save_user(self, request, user, form, commit=True):
        from allauth.account.utils import user_field

        user = super().save_user(request, user, form, False)
        user_field(user, 'name', request.data.get('name', ''))
        user_field(user, 'phone_number', request.data.get('phone_number', ''))
        user.save()
        return user


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any):
        return getattr(settings, "SOCIALACCOUNT_ALLOW_REGISTRATION", True)
