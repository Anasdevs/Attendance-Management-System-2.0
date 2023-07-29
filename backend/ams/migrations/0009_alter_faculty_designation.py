# Generated by Django 4.1.7 on 2023-07-29 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ams', '0008_remove_faculty_email_alter_attendance_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='faculty',
            name='Designation',
            field=models.CharField(blank=True, choices=[('HOD', 'HOD'), ('Associate Professor', 'Associate Professor'), ('Assistant Professor', 'Assistant Professor')], default=None, max_length=50),
        ),
    ]
