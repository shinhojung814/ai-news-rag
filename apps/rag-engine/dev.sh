#!/bin/bash
# dev.sh
cd "$(dirname "$0")"
source ./venv/bin/activate
uvicorn main:app --reload --port 8000