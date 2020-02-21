from django.contrib import admin
from .models import Item, Category, Message, OTP, DeviceInfo


class ItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'key', 'user', 'category', 'status')
    list_filter = ['user', 'status']
    search_fields = ('title', 'key', 'user', 'category', 'status')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'description',)
    search_fields = ('title', 'description',)


class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'content', 'is_read')
    list_filter = ['sender', 'receiver', 'is_read']
    search_fields = ('content', )


class OTPAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'otp')
    search_fields = ('phone_number', 'otp')


class DeviceInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'device_id', 'is_active', 'push_token')
    list_filter = ['user',]
    search_fields = ('device_id', )


admin.site.register(Category, CategoryAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(OTP, OTPAdmin)
admin.site.register(DeviceInfo, DeviceInfoAdmin)