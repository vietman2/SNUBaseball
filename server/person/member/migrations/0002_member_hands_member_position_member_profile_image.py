# Generated by Django 4.2.15 on 2024-10-15 09:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('image', '0001_initial'),
        ('member', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='hands',
            field=models.IntegerField(choices=[(0, '미분류'), (1, '우투우타'), (2, '우투좌타'), (3, '좌투우타'), (4, '좌투좌타'), (5, '양투우타'), (6, '양투좌타'), (7, '우투양타'), (8, '좌투양타'), (9, '양투양타')], default=0),
        ),
        migrations.AddField(
            model_name='member',
            name='position',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='member',
            name='profile_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='image.image'),
        ),
    ]
