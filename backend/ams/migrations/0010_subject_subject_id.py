# Generated by Django 3.1.7 on 2023-08-11 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ams', '0009_bca_attendance_subject_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='subject_id',
            field=models.IntegerField(default=None),
        ),
    ]
