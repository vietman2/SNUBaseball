# Generated by Django 4.2.15 on 2024-10-16 15:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FeedbackCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=20)),
                ('color', models.CharField(max_length=7)),
                ('background_color', models.CharField(max_length=7)),
            ],
            options={
                'db_table': 'feedback_category',
            },
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=40)),
                ('content', models.TextField()),
                ('num_views', models.IntegerField(default=0)),
                ('is_deleted', models.BooleanField(default=False)),
                ('status', models.IntegerField(choices=[(0, '신규'), (1, '진행중'), (2, '검토중'), (3, '완료')], default=0)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s', to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feedback.feedbackcategory')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feedbacks', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'feedback',
            },
        ),
    ]
