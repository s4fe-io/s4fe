from fcm_django.models import FCMDevice


def push_notification(title, user, message):
    try:
        devices = FCMDevice.objects.filter(user=user)
        devices.send_message(title=title, body=message)
        return True

    except Exception:
        return False