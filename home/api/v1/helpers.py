from django.conf import settings
from twilio.rest import Client
import os
import logging


logger = logging.getLogger(__name__)


def sendSMS(to_number, body):
    account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    auth_token =  os.environ.get('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)
    try:
        message = client.messages \
            .create(
            body=body,
            from_="+14154171033",
            to=to_number
        )
        logger.info(account_sid)
        logger.info(auth_token)
        logger.info('SMS sent !')
        return True
    except Exception as e:
        logger.info('SMS error !' + str(e))
        return False