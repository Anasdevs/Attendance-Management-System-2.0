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

for `frontend only` | port - 8000

``` shell
make frontend-setup
make frontend-run
``` 

for `backend only` | port - 7000

``` shell
make backend-setup
make backend-run
```

## Docker setup [not working]

for `frontend` | port - 8000

``` shell
docker build -t frontend-image -f Dockerfile .
docker run -d -p 3000:3000 frontend-image
```

for `backend` | port - 7000

``` shell
docker build -t backend-image -f Dockerfile .
docker run -d -p 8000:8000 backend-image
```
