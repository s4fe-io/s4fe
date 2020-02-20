from django.conf import settings
from twilio.rest import Client
import os


def sendSMS(to_number, body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token =  os.environ.get('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)
    try:
        message = client.messages \
            .create(
            body=body,
            from_=settings.SENDERNUMBER['number'],
            to=to_number
        )
        return True
    except Exception as e:
        return False