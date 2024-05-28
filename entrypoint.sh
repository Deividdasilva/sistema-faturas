#!/bin/bash

if [ "$MODE" == "test" ]; then
  echo "Running Tests..."
  npm test
else
  echo "Starting Application..."
  npm run dev
fi
