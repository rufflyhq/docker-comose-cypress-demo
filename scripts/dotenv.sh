#!/bin/bash

ENV_FILE=".env.$NODE_ENV"

dotenv () {
  set -a
  [ -f .env ] && source .env
  [ -f $ENV_FILE ] && source $ENV_FILE
  set +a
}

# Run dotenv
dotenv
