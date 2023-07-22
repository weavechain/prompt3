#!/bin/bash

docker compose -f distil_prompt.yml down
docker rmi -f "$(docker images | grep distil_prompt | awk '{print $3}')"
docker rm -f "$(docker ps -a | grep distil_prompt | awk '{print $1}')"
docker compose -f distil_prompt.yml build