# Attendance Management System

## Overview
The Attendance Management System has been specifically designed to automate and streamline the attendance management process. It offers a digital platform that efficiently records, monitors, and analyzes student attendance data, replacing the traditional manual methods currently in use.

## Purpose
The primary purpose of implementing the Attendance Management System is to simplify and enhance the attendance tracking process. By adopting this system, we aim to replace the tedious and error-prone manual methods of attendance management with an automated and efficient solution.

##

> __Frontend__ by `Anas Saifi`
>
> __Backend__ by `Harsh Agnihotri`
>
> __Android App__ by `Amanjot Singh`

## makefile setup

for __`both Backend and Frontend`__

``` shell
make setup
make run
```

for `Frontend only` | port - 7000

``` shell
make FSetup
make FRun
``` 

for `Backend only` | port - 8000

``` shell
make BSetup
make BRun
```
for `Database migerations`

``` shell
make db-mig
```

for `App` 

``` shell
flutter pub get
flutter run
```

## Docker setup [not working]

for `frontend` | port - 7000

``` shell
docker build -t frontend-image -f Dockerfile .
docker run -d -p 7000:7000 frontend-image
```

for `backend` | port - 8000

``` shell
docker build -t backend-image -f Dockerfile .
docker run -d -p 8000:8000 backend-image
```
