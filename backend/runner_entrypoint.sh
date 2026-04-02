#!/bin/sh
set -e
echo "[RUNNER] Cloning $REPO_URL..."
git clone "$REPO_URL" /repo
cd /repo

if [ -f requirements.txt ]; then
  echo "[RUNNER] Installing dependencies..."
  pip install -r requirements.txt --quiet
fi

echo "[RUNNER] Running tests..."
python -m pytest --tb=short -q 2>&1