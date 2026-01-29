#!/bin/bash
# This script runs after npm install on Heroku
# It removes build cache to reduce slug size
# Note: Images are now compressed (~93MB total) and kept in the slug

echo "Cleaning up build cache to reduce Heroku slug size..."

# Remove build cache if it exists (this can be large)
if [ -d ".next/cache" ]; then
  echo "Removing .next/cache/..."
  rm -rf .next/cache/
fi

# Images are now compressed and kept in the slug (~93MB total)
# This is well within the 500MB limit
echo "Cleanup complete. Images are kept in the slug (compressed)."
