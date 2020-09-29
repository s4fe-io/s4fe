from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group


from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()

admin.site.unregister(Group)


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name", "phone_number", "unique_identifier")}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "email", "first_name", "last_name", "phone_number", "is_superuser", "unique_identifier"]
    search_fields = ["email", "name", "phone_number", "unique_identifier"]
