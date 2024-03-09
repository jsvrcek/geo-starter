from django.db import migrations
from django.contrib.auth.models import User


def create_admin_user(apps, schema_editor):
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0002_feature'),
    ]

    operations = [
        migrations.RunPython(create_admin_user),
    ]
