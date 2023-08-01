# Generated by Django 3.1.7 on 2023-08-01 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ams', '0009_alter_faculty_designation'),
    ]

    operations = [
        migrations.AddField(
            model_name='faculty',
            name='role',
            field=models.CharField(blank=True, choices=[('Hod', 'Hod'), ('Class Coordinator', 'Class Coordinator'), ('Subject Teacher', 'Subject Teacher')], default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='attendance',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='class',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='faculty',
            name='Designation',
            field=models.CharField(blank=True, choices=[('Associate Professor', 'Associate Professor'), ('Assistant Professor', 'Assistant Professor')], default=None, max_length=50),
        ),
        migrations.AlterField(
            model_name='faculty',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='student',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
