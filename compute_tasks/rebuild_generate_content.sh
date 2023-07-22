#!/bin/bash

docker compose -f generate_content.yml down
docker rmi -f "$(docker images | grep generate_content | awk '{print $3}')"
docker rm -f "$(docker ps -a | grep generate_content | awk '{print $1}')"
docker compose -f generate_content.yml build