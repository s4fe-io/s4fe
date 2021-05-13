from fcm_django.models import FCMDevice


def push_notification(title, user, sender, message):
    try:
        devices = FCMDevice.objects.filter(user=user)
        devices.send_message(title=title, body=message, data={"test": "test"}, badge=sender.id)
        return True

    except Exception:
        return False