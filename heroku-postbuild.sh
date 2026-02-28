#!/bin/bash
set -e

echo "Building Next.js application (standalone mode)..."
npm run build

echo "Setting up standalone deployment..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

echo "Cleaning up to reduce slug size..."
rm -rf .next/cache
rm -rf public
rm -rf node_modules && mkdir node_modules
rm -rf app components lib src context types
rm -rf tokens.css DESIGN_SYSTEM.md SUPABASE_IMPLEMENTATION.md HEROKU_READINESS_REPORT.md
rm -rf generate-product-import.ts supabase

echo "Build complete! Slug optimized for Heroku."
