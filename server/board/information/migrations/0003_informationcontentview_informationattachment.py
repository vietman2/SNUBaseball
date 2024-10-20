# Generated by Django 4.2.15 on 2024-10-16 13:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('information', '0002_remove_information_cover_image_information_pin'),
    ]

    operations = [
        migrations.CreateModel(
            name='InformationContentView',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('viewed_first_at', models.DateTimeField(auto_now_add=True)),
                ('viewed_last_at', models.DateTimeField(auto_now=True)),
                ('information', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='information.information')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'information_content_view',
            },
        ),
        migrations.CreateModel(
            name='InformationAttachment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('file', models.FileField(upload_to='')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('information', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='information.information')),
            ],
            options={
                'db_table': 'information_attachment',
            },
        ),
    ]
