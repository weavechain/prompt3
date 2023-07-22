#!/bin/bash

export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker compose -f distil_prompt.yml down
docker rmi -f "$(docker images | grep distil_prompt | awk '{print $3}')"
docker rm -f "$(docker ps -a | grep distil_prompt | awk '{print $1}')"
docker compose -f distil_prompt.yml build

docker tag distil_prompt gcr.io/weavechain/distil_prompt:1.0
docker push gcr.io/weavechain/distil_prompt:1.0
docker tag distil_prompt gcr.io/weavechain/distil_prompt:latest
docker push gcr.io/weavechain/distil_prompt:latest