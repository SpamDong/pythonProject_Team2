# Generated by Django 4.0.1 on 2022-01-19 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hplace', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='contents1',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
