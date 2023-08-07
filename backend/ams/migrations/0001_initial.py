# Generated by Django 4.1.7 on 2023-08-07 11:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_id', models.IntegerField()),
                ('course', models.CharField(max_length=100)),
                ('semester', models.IntegerField()),
                ('section', models.CharField(max_length=10)),
                ('shift', models.CharField(max_length=20)),
                ('subject', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('faculty_id', models.CharField(max_length=20, unique=True)),
                ('faculty_name', models.CharField(max_length=100)),
                ('faculty_email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(blank=True, default=None, max_length=128)),
                ('faculty_image', models.ImageField(blank=True, null=True, upload_to='faculty_images/')),
                ('Designation', models.CharField(blank=True, choices=[('Associate Professor,Head ', 'Associate Professor,Head'), ('Assistant Professor,Head', 'Assistant Professor,Head'), ('Assistant Professor', 'Assistant Professor'), ('Associate Professor', 'Associate Professor')], default=None, max_length=50)),
                ('department', models.CharField(default=None, max_length=50)),
                ('qualifications', models.CharField(blank=True, default=None, max_length=200)),
                ('role', models.CharField(blank=True, choices=[('Head Of Department(HOD)', 'Head Of Department(HOD)'), ('Class Coordinator', 'Class Coordinator'), ('Subject Teacher', 'Subject Teacher')], default=None, max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Mba_Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('enrolment_no', models.CharField(max_length=20)),
                ('class_attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Law_students', to='ams.class')),
            ],
            options={
                'ordering': ['enrolment_no'],
            },
        ),
        migrations.AddField(
            model_name='class',
            name='assigned_to',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ams.faculty'),
        ),
        migrations.CreateModel(
            name='Bca_Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('enrolment_no', models.CharField(max_length=20)),
                ('class_attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Bca_students', to='ams.class')),
            ],
            options={
                'ordering': ['enrolment_no'],
            },
        ),
        migrations.CreateModel(
            name='Bba_Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('enrolment_no', models.CharField(max_length=20)),
                ('class_attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Bba_students', to='ams.class')),
            ],
            options={
                'ordering': ['enrolment_no'],
            },
        ),
        migrations.CreateModel(
            name='B_Ed_Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('enrolment_no', models.CharField(max_length=20)),
                ('class_attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='B_Ed_students', to='ams.class')),
            ],
            options={
                'ordering': ['enrolment_no'],
            },
        ),
        migrations.CreateModel(
            name='B_Com_Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
            name='Bca_Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[(None, 'Not marked'), ('Present', 'Present'), ('Absent', 'Absent')], default=None, max_length=10, null=True)),
                ('class_attendance', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ams.class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ams.bca_student')),
            ],
            options={
                'unique_together': {('student', 'date')},
            },
        ),
        migrations.CreateModel(
            name='Bba_Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[(None, 'Not marked'), ('Present', 'Present'), ('Absent', 'Absent')], default=None, max_length=10, null=True)),
                ('class_attendance', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ams.class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ams.bba_student')),
            ],
            options={
                'unique_together': {('student', 'date')},
            },
        ),
        migrations.CreateModel(
            name='B_Ed_Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[(None, 'Not marked'), ('Present', 'Present'), ('Absent', 'Absent')], default=None, max_length=10, null=True)),
                ('class_attendance', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='ams.class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ams.b_ed_student')),
            ],
            options={
                'unique_together': {('student', 'date')},
            },
        ),
        migrations.CreateModel(
            name='B_com_Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
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
