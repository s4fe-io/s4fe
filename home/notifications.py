from exponent_server_sdk import DeviceNotRegisteredError, PushClient, PushMessage, PushServerError
from requests.exceptions import ConnectionError, HTTPError
import logging
import requests
import os
import base64
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName,FileType, Disposition
from sendgrid import SendGridAPIClient


logger = logging.getLogger(__name__)


def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
    except PushServerError as exc:
        logger.error("Formatting/validation error !", exc_info=True)
        return False
    except (ConnectionError, HTTPError) as exc:
        logger.error("Connection or HTTP error !", exc_info=True)
        return False

    try:
        response.validate_response()
        logger.info(response, exc_info=True)
        return True
    except DeviceNotRegisteredError:
        logger.error("Device not registered !", exc_info=True)
        return False


def send_email_notification(user, from_email, to_email, subject, body, attachment_url=None):
    if to_email:
        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=body
        )
        if attachment_url is not None:
            try:
                document = requests.get(attachment_url).content
                document = base64.b64encode(document)
                message.attachment = Attachment(FileContent(document.decode()),
                                                FileName('account-summary.pdf'),
                                                FileType('application/pdf'),
                                                Disposition('attachment')
                                                )
            except Exception as e:
                raise e
        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(message)
            status = True
        except Exception as e:
            logger.error("Email not sent !", exc_info=True)
            status = False

