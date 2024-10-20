# Generated by Django 4.2.15 on 2024-10-20 17:14

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('member', '0003_alter_member_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='num_semester',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(20)]),
        ),
        migrations.AlterField(
            model_name='member',
            name='role',
            field=models.IntegerField(choices=[(0, '미분류'), (1, '주장'), (2, '부주장'), (3, '수석매니저'), (4, '매니저'), (5, '선수'), (6, '지도자'), (9, '기타')], default=0),
        ),
        migrations.AlterField(
            model_name='member',
            name='status',
            field=models.IntegerField(choices=[(0, '미분류'), (1, '활동'), (2, '비활동'), (3, '군입대'), (4, '졸업'), (9, '기타')], default=0),
        ),
    ]
