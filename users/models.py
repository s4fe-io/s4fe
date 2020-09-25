from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
import uuid


class User(AbstractUser):
    name = models.CharField(blank=True, null=True, max_length=255)
    phone_number = models.CharField(max_length=25, blank=False, null=False)
    unique_identifier = models.CharField(max_length=255, blank=True, null=True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def save(self, *args, **kwargs):
        self.unique_identifier = str(uuid.uuid4())
        super(User, self).save(*args, **kwargs)