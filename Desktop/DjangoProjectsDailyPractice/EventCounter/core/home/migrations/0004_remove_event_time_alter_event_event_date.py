# Generated by Django 5.0.6 on 2024-08-25 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_event_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='time',
        ),
        migrations.AlterField(
            model_name='event',
            name='event_date',
            field=models.DateTimeField(),
        ),
    ]