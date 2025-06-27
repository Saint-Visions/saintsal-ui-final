#!/bin/bash

# SaintVisionAI™ Production Deployment Script for Azure
set -e

# Configuration
RESOURCE_GROUP="saintvisionai-production-rg"
APP_NAME="saintvisionai-production"
LOCATION="East US"
SUBSCRIPTION_ID="6a36d83c-db31-4d2f-9f3b-a3beb5459e77"

echo "🚀 Starting SaintVisionAI™ Production Deployment..."
echo "=============================================="

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first."
    exit 1
fi

# Set subscription
echo "📋 Setting Azure subscription..."
az account set --subscription "$SUBSCRIPTION_ID"

# Verify subscription
CURRENT_SUB=$(az account show --query id --output tsv)
if [ "$CURRENT_SUB" != "$SUBSCRIPTION_ID" ]; then
    echo "❌ Failed to set subscription. Current: $CURRENT_SUB, Expected: $SUBSCRIPTION_ID"
    exit 1
fi

echo "✅ Azure subscription set to: SaintSal Core Production"

# Create resource group
echo "📦 Creating resource group..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

# Deploy infrastructure
echo "🏗️  Deploying Azure infrastructure..."
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file azure-deploy.json \
    --parameters siteName="$APP_NAME"

echo "✅ Infrastructure deployed successfully!"

# Build the application
echo "🔧 Building SaintVisionAI™ application..."
npm ci
npm run build

echo "✅ Build completed successfully!"

# Create deployment package
echo "📦 Creating deployment package..."
zip -r deployment.zip .next/ public/ package.json package-lock.json next.config.js

# Deploy to Azure App Service
echo "🚀 Deploying to Azure App Service..."
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src deployment.zip

# Set Node.js version
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings "WEBSITE_NODE_DEFAULT_VERSION=18-lts"

# Get the application URL
APP_URL=$(az webapp show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --query defaultHostName --output tsv)

echo ""
echo "🎉 SaintVisionAI™ Deployment Complete!"
echo "=============================================="
echo "🌐 Application URL: https://$APP_URL"
echo ""
echo "🚀 SaintVisionAI™ is now live in production!"

# Cleanup
rm -f deployment.zip
