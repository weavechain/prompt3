#!/bin/bash

export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker compose -f generate_content.yml down
docker rmi -f "$(docker images | grep generate_content | awk '{print $3}')"
docker rm -f "$(docker ps -a | grep generate_content | awk '{print $1}')"
docker compose -f generate_content.yml build

docker tag generate_content gcr.io/weavechain/generate_content:1.0
docker push gcr.io/weavechain/generate_content:1.0
docker tag generate_content gcr.io/weavechain/generate_content:latest
docker push gcr.io/weavechain/generate_content:latest