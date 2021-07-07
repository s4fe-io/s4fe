from django.urls import path
from .views import home
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from home.api.v1.viewsets import FacebookLogin, GoogleLogin, AppleLogin

urlpatterns = [
    path("", home, name="home"),
    url(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/google/$', GoogleLogin.as_view(), name='google_login'),
    url(r'^rest-auth/apple/$', AppleLogin.as_view(), name='apple_login'),
]

urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)

