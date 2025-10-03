#!/bin/bash
if [[ $(docker ps -f "name=guss-db" -q) ]]; then
  echo "Creating new application image"
  docker compose up -d --force-recreate --build --no-deps auth-app
else
  echo "Starting all images"
  docker compose up -d
fi
