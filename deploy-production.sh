#!/bin/bash

# SaintVisionAI™ Production Deployment Script for Azure
# Author: SaintSal Core Production Team
# Version: 1.0.0

set -e

# Configuration
RESOURCE_GROUP="saintvisionai-production-rg"
APP_NAME="saintvisionai-production"
LOCATION="East US"
SUBSCRIPTION_ID="6a36d83c-db31-4d2f-9f3b-a3beb5459e77"
BUILD_DIR=".next"

echo "🚀 Starting SaintVisionAI™ Production Deployment..."
echo "=============================================="

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first."
    echo "   Visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
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

# Create resource group if it doesn't exist
echo "📦 Creating resource group..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

# Deploy infrastructure
echo "🏗️  Deploying Azure infrastructure..."
DEPLOYMENT_OUTPUT=$(az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file azure-deploy.json \
    --parameters siteName="$APP_NAME" \
    --output json)

if [ $? -ne 0 ]; then
    echo "❌ Infrastructure deployment failed!"
    exit 1
fi

echo "✅ Infrastructure deployed successfully!"

# Build the application
echo "🔧 Building SaintVisionAI™ application..."

# Clean previous builds
rm -rf "$BUILD_DIR"
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the application
echo "🏗️  Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Create deployment package
echo "📦 Creating deployment package..."
DEPLOYMENT_PACKAGE="saintvisionai-deployment.zip"

# Remove old package
rm -f "$DEPLOYMENT_PACKAGE"

# Create package with necessary files
zip -r "$DEPLOYMENT_PACKAGE" \
    .next/ \
    public/ \
    package.json \
    package-lock.json \
    next.config.js \
    .env.production \
    -x "*.git*" "node_modules/*" ".env.local" ".env.development"

echo "✅ Deployment package created: $DEPLOYMENT_PACKAGE"

# Deploy to Azure App Service
echo "🚀 Deploying to Azure App Service..."

# Deploy the package
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src "$DEPLOYMENT_PACKAGE"

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed!"
    exit 1
fi

# Set environment variables
echo "⚙️  Configuring environment variables..."

# Read environment variables from .env.production
if [ -f ".env.production" ]; then
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        if [[ $key =~ ^[[:space:]]*# ]] || [[ -z $key ]]; then
            continue
        fi
        
        # Remove quotes from value
        value=$(echo "$value" | sed 's/^"//;s/"$//')
        
        echo "Setting $key..."
        az webapp config appsettings set \
            --resource-group "$RESOURCE_GROUP" \
            --name "$APP_NAME" \
            --settings "$key=$value" \
            --output none
    done < .env.production
fi

# Set Node.js version
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings "WEBSITE_NODE_DEFAULT_VERSION=18-lts" \
    --output none

echo "✅ Environment variables configured!"

# Restart the application
echo "🔄 Restarting application..."
az webapp restart --resource-group "$RESOURCE_GROUP" --name "$APP_NAME"

# Get the application URL
APP_URL=$(az webapp show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --query defaultHostName --output tsv)

echo ""
echo "🎉 SaintVisionAI™ Deployment Complete!"
echo "=============================================="
echo "🌐 Application URL: https://$APP_URL"
echo "📊 Resource Group: $RESOURCE_GROUP"
echo "🏷️  App Service: $APP_NAME"
echo "📍 Location: $LOCATION"
echo ""

# Health check
echo "🏥 Performing health check..."
sleep 30

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$APP_URL" || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Health check passed! Application is running successfully."
else
    echo "⚠️  Health check returned status: $HTTP_STATUS"
    echo "   The application may still be starting up. Please check the logs."
fi

# Show logs command
echo ""
echo "📋 To view application logs:"
echo "   az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""
echo "🔧 To access Azure portal:"
echo "   https://portal.azure.com/#@/resource/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$APP_NAME"

# Cleanup
rm -f "$DEPLOYMENT_PACKAGE"

echo ""
echo "🚀 SaintVisionAI™ is now live in production!"
echo "   Visit: https://$APP_URL"
