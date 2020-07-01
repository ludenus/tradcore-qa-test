#!/bin/bash -xe


docker run \
         -it \
         -v $PWD:/e2e \
         -w /e2e \
         -e CYPRESS_baseUrl=http://172.17.0.1:3111 \
         cypress/included:4.9.0


#export DISPLAY=:1
#xhost +
#docker run -it --rm \
#    --network host \
#    -v ~/.Xauthority:/root/.Xauthority:rw \
#    -e DISPLAY \
#    -v $PWD:/e2e \
#    -w /e2e \
#    -e CYPRESS_baseUrl=http://172.17.0.1:3111 \
#    --entrypoint '' \
#    cypress/included:4.9.0 \
#    npx cypress open --project .
#
#
#
