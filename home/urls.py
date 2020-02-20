from django.urls import path
from .views import home
from django.conf.urls import url
from home.api.v1.viewsets import FacebookLogin, GoogleLogin

urlpatterns = [
    path("", home, name="home"),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/google/$', GoogleLogin.as_view(), name='fb_login'),
]