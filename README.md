# Attendance management project

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
