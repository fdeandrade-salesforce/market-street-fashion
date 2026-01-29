#!/bin/bash
# This script runs after npm install on Heroku
# It removes large files that are not needed in the production slug
# Note: Files are removed AFTER build to reduce slug size

echo "Cleaning up large files to reduce Heroku slug size..."

# Remove large product images (774MB) - these should be served from CDN in production
if [ -d "public/images/products" ]; then
  echo "Removing public/images/products/ (774MB)..."
  rm -rf public/images/products/
fi

# Remove large support resources (132MB) - these should be served from CDN
if [ -d "public/resources" ]; then
  echo "Removing public/resources/ (132MB)..."
  rm -rf public/resources/
fi

# Remove build cache if it exists
if [ -d ".next/cache" ]; then
  echo "Removing .next/cache/..."
  rm -rf .next/cache/
fi

echo "Cleanup complete. Slug size should be significantly reduced."
