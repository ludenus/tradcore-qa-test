## tradcore-qa-test

This is a cypress test suite for [tradcore-app](https://github.com/ludenus/tradcore-app) application.

### Prerequisites

To run the test suite you must have the latest version of `Docker` and `docker-compose`.
We won't provide the explanation on how to install `Docker` and `docker-compose`. Google it.

### Build tradecode-app
1. When a new commit is pushed into `master` branch of the  [tradcore-app](https://github.com/ludenus/tradcore-app) repository  Dockerhub triggers [build](https://hub.docker.com/repository/docker/ludenus/tradcore-app/builds) automatically and produce `ludenus/tradcore-app` docker image  with tag `latest`.

2. When a new tag is pushed into  [tradcore-app](https://github.com/ludenus/tradcore-app) repository Dockerhub triggers [build](https://hub.docker.com/repository/docker/ludenus/tradcore-app/builds) automatically and produce `ludenus/tradcore-app` docker image with the same tag name.

### Test tradecode-app

To run tests against `latest` version of  `ludenus/tradcore-app` docker image:
```
docker-compose up  --abort-on-container-exit -t1
```
To run tests against specific version of  `ludenus/tradcore-app` docker image:
```
export TRADECORE_APP_VERSION=0.0.1
docker-compose up  --abort-on-container-exit -t1
```
Valid tags for tradcore-app docker image are listed on [Dockerhub](https://hub.docker.com/repository/docker/ludenus/tradcore-app)

By default tests are using `cypress/included:4.9.0` docker image,
To specify another cypress docker image version explicitly:
```
export CYPRESS_INCLUDED_VERSION=4.8.0
docker-compose up  --abort-on-container-exit -t1
```