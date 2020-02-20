from django.contrib import admin
from .models import Item, Category, Message, OTP


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


admin.site.register(Item, ItemAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(OTP, OTPAdmin)