# Generated by Django 3.1.7 on 2023-08-08 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ams', '0002_auto_20230808_1913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='section',
            field=models.CharField(choices=[('Section A', 'Section A'), ('Section B', 'Section B'), ('Section C', 'Section C'), ('Section D', 'Section D')], max_length=10),
        ),
        migrations.AlterField(
            model_name='class',
            name='shift',
            field=models.CharField(choices=[('Morning Shift', 'Morning Shift'), ('Evening Shift', 'Evening Shift')], max_length=20),
        ),
    ]
