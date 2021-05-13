from fcm_django.models import FCMDevice


def push_notification(title, user, sender, message):
    try:
        devices = FCMDevice.objects.filter(user=user)
        a = devices.send_message(title=title, body=message, data={"test": sender.id})
        print(a)
        return True

    except Exception as e:
        print(e)
        return False