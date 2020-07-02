#!/bin/bash -xe

docker kill tradcore-app || true
docker rm   tradcore-app || true

docker build -t tradcore-app:local . 
docker run -d --name=tradcore-app -p3111:3000 tradcore-app:local
sleep 1

docker logs tradcore-app
docker ps -a | grep tradcore-app
