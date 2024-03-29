from django.db import models

# Create your models here.

from django.db import models
from users.models import User
import sys
from django.dispatch import receiver
from home.notifications import send_push_message
from home.api.v1.notifications import push_notification
import uuid
from django.utils import timezone
from django_extensions.db.fields import AutoSlugField

class Category(models.Model):

    # Fields
    title = models.CharField(max_length=255)
    description = models.TextField(default="")
    created = models.DateTimeField(auto_now_add=True, editable=False)
    parent = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE, related_name="children")
    can_have_items = models.BooleanField(default=True)
    img = models.ImageField(upload_to='categories/', null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ('-created',)

    def __str__(self):
        full_path = [self.title]
        k = self.parent
        while k is not None:
            full_path.append(k.title)
            k = k.parent
        return ' / '.join(full_path[::-1])


class Item(models.Model):
    STATUS_CHOICES = (
        ("A", "Active"),
        ("L", "Lost"),
        ("S", "Stolen"))

    title = models.CharField(max_length=255)
    key = models.CharField(max_length=255, blank=False, null=False)
    serial = models.CharField(max_length=255, blank=True, null=True)
    unique_identifier = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(User, related_name="item_user", blank=True, null=True, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, related_name="item_category", on_delete=models.PROTECT)
    desc = models.TextField(default="", blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="A")
    created = models.DateTimeField(auto_now_add=True, editable=False)
    updated = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)

    serial_slug = AutoSlugField(null=True, default=None, populate_from='serial', allow_duplicates=True)

    class Meta:
        verbose_name_plural = 'Items'
        ordering = ('-updated',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super(Item, self).save(*args, **kwargs)

class OTP(models.Model):
    otp = models.CharField(max_length=4, default="")
    phone_number = models.CharField(max_length=25, blank=False, null=False, default="")
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name_plural = 'OTP'
        ordering = ('-created',)

    def __str__(self):
        return str(self.otp)


class Transaction(models.Model):
    user_from = models.ForeignKey(User, related_name="trans_user_from", blank=True, null=True, on_delete=models.PROTECT)
    user_to = models.ForeignKey(User, related_name="trans_user_to", on_delete=models.PROTECT)
    item = models.ForeignKey(Item, related_name="trans_item", on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name_plural = 'Transactions'
        ordering = ('-created',)

    def __str__(self):
        return str(self.item)


class Message(models.Model):
    sender = models.ForeignKey(User, related_name="user_sender", on_delete=models.PROTECT)
    receiver = models.ForeignKey(User, related_name="user_receiver", on_delete=models.PROTECT)
    content = models.TextField(default="")
    is_read = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        verbose_name_plural = 'Messages'
        ordering = ('-created',)

    def __str__(self):
        return str(self.pk)


@receiver(models.signals.post_save, sender=Message)
def message_notify(sender, instance, *args, **kwargs):
    title = "{} sent you a message".format(instance.sender.first_name)
    push_notification(title, instance.receiver, instance.sender, instance.content)


class DeviceInfo(models.Model):
    user = models.ForeignKey(User, related_name="device_user", on_delete=models.PROTECT)
    device_id = models.CharField(max_length=128, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField(default=True)
    push_token = models.CharField(max_length=256, null=True, default=None)

    class Meta:
        verbose_name_plural = 'Devices'
        ordering = ('-created',)

    def __str__(self):
        return str(self.pk)


class ItemInterface(models.Model):
    title = models.CharField(max_length=50, blank=True)
    serial = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    desc = models.TextField(max_length=50, blank=True)
    status = models.CharField(max_length=50, blank=True)
    is_valid = models.BooleanField(default=False)
    errors = models.TextField(blank=True)
    creator = models.ForeignKey(User, related_name="item_interface_user", on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = 'Items Interface'

    def __str__(self):
        return str(self.title)
