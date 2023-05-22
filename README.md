# Attendence management project

> __frontend__ by `Anas Safi`
>
> __backend__ by `Harsh Agnihotri`

## makefile setup

for __`both backend and frontend`__

``` shell
make setup
make run
```

for `frontend only` | port - 7000

``` shell
make FSetup
make FRun
``` 

for `backend only` | port - 8000

``` shell
make BSetup
make BRun
```
for `database migerations`

``` shell
make db-mig
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
