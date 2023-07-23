# Generated by Django 4.1.7 on 2023-07-23 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ams', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='faculty',
            name='faculty_image',
            field=models.ImageField(blank=True, null=True, upload_to='faculty_images/'),
        ),
        migrations.AlterField(
            model_name='faculty',
            name='password',
            field=models.CharField(blank=True, default=None, max_length=128),
        ),
    ]