# Generated by Django 4.1.7 on 2023-08-10 05:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ams', '0006_remove_class_assigned_to_remove_class_subject_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='Class_subject',
            new_name='class_subject',
        ),
        migrations.RenameField(
            model_name='subject',
            old_name='Name',
            new_name='subject_name',
        ),
    ]