from django.core.management import BaseCommand
from home.models import CustomText, HomePage


def load_initial_data():
    homepage_body = """
        <h1 class="display-4 text-center">S3FE-App</h1>
        <p class="lead">
            This is S4FE Backend Application
        </p>"""
    customtext_title = 'S4fe-App'
    CustomText.objects.create(title=customtext_title)
    HomePage.objects.create(body=homepage_body)


class Command(BaseCommand):
    can_import_settings = True
    help = 'Load initial data to db'

    def handle(self, *args, **options):
        load_initial_data()
