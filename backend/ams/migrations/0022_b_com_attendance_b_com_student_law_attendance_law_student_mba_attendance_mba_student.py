# Generated by Django 3.1.7 on 2023-08-06 08:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ams', '0021_b_ed_attendance'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mba_Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('enrolment_no', models.CharField(max_length=20)),
                ('class_attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Mba_students', to='ams.class')),
            ],
            options={
                'ordering': ['enrolment_no'],
            },
        ),
        migrations.CreateModel(
            name='Law_Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('enrolment_no', models.CharField(max_length=20)),
                ('class_attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Law_students', to='ams.class')),
            ],
            options={
                'ordering': ['enrolment_no'],
            },
        ),
        migrations.CreateModel(
            name='B_Com_Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('enrolment_no', models.CharField(max_length=20)),
                ('class_attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='B_Com_students', to='ams.class')),
            ],
            options={
                'ordering': ['enrolment_no'],
            },
        ),
        migrations.CreateModel(
            name='Mba_Attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[(None, 'Not marked'), ('Present', 'Present'), ('Absent', 'Absent')], default=None, max_length=10, null=True)),
                ('class_attendance', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ams.class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ams.mba_student')),
            ],
            options={
                'unique_together': {('student', 'date')},
            },
        ),
        migrations.CreateModel(
            name='Law_Attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[(None, 'Not marked'), ('Present', 'Present'), ('Absent', 'Absent')], default=None, max_length=10, null=True)),
                ('class_attendance', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ams.class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ams.law_student')),
            ],
            options={
                'unique_together': {('student', 'date')},
            },
        ),
        migrations.CreateModel(
            name='B_com_Attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[(None, 'Not marked'), ('Present', 'Present'), ('Absent', 'Absent')], default=None, max_length=10, null=True)),
                ('class_attendance', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ams.class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ams.b_com_student')),
            ],
            options={
                'unique_together': {('student', 'date')},
            },
        ),
    ]
