from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse


class User(AbstractUser):
    name = models.CharField(blank=True, null=True, max_length=255)
    phone_number = models.CharField(max_length=25, blank=False, null=False)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})
