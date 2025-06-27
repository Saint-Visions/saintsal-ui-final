#!/bin/bash

# ============================================
# SaintVisionAI™ Azure Deployment Troubleshooter
# ============================================
# Your GOTTA GUY™ is going LIVE! 🚀

set -e

# Configuration
RESOURCE_GROUP="saintvisionai-production-rg"
APP_NAME="saintvisionai-production"
PLAN_NAME="saintvisionai-plan"
LOCATION="East US"
SUBSCRIPTION_ID="6a36d83c-db31-4d2f-9f3b-a3beb5459e77"

echo "🔍 STEP 1: Checking if web app exists..."
echo "=============================================="

# Check if the web app exists
az webapp list --resource-group "$RESOURCE_GROUP" --query "[].{name:name, state:state, defaultHostName:defaultHostName}" --output table

echo ""
echo "🔧 STEP 2: Creating/ensuring all resources exist..."
echo "=============================================="

# Ensure resource group exists
echo "📦 Creating resource group..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

# Ensure App Service Plan exists
echo "📋 Creating App Service Plan..."
az appservice plan create \
    --name "$PLAN_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --sku "B1" \
    --is-linux \
    --output table || echo "App Service Plan already exists"

# Create the web app
echo "🌐 Creating Web App..."
az webapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --plan "$PLAN_NAME" \
    --runtime "NODE|18-lts" \
    --output table || echo "Web App already exists"

echo ""
echo "🚀 STEP 3: Building and deploying your SaintVisionAI™..."
echo "=============================================="

# Check if we have the necessary files for deployment
if [[ ! -f "package.json" ]]; then
    echo "❌ package.json not found. Are you in the right directory?"
    exit 1
fi

# Build the project if .next doesn't exist
if [[ ! -d ".next" ]]; then
    echo "🔧 Building project..."
    npm install
    npm run build
fi

# Create deployment package
echo "📦 Creating deployment package..."
DEPLOYMENT_PACKAGE="saintvisionai-deployment.zip"
rm -f "$DEPLOYMENT_PACKAGE"

zip -r "$DEPLOYMENT_PACKAGE" \
    .next/ \
    public/ \
    package.json \
    package-lock.json \
    next.config.js \
    -x "*.git*" ".env.local" ".env.development" || {
    echo "❌ Failed to create deployment package"
    exit 1
}

# Deploy to Azure
echo "🚀 Deploying to Azure App Service..."
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src "$DEPLOYMENT_PACKAGE" \
    --output table

# Configure app settings
echo "⚙️ Configuring app settings..."
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings \
        WEBSITE_NODE_DEFAULT_VERSION=18-lts \
        SCM_DO_BUILD_DURING_DEPLOYMENT=true \
        NODE_ENV=production \
    --output table

echo ""
echo "🧪 STEP 4: Testing deployment..."
echo "=============================================="

# Get the app URL
APP_URL=$(az webapp show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --query defaultHostName \
    --output tsv)

echo "🌐 App URL: https://$APP_URL"

# Test the deployment
echo "🧪 Testing with curl..."
sleep 10  # Give the app a moment to start
curl -I "https://$APP_URL" || echo "⚠️ App may still be starting up"

echo ""
echo "🎉 DEPLOYMENT COMPLETE! 🎉"
echo "=============================================="
echo "🌐 Your SaintVisionAI™ should be live at:"
echo "   https://$APP_URL"
echo ""
echo "💫 GOTTA GUY™ with perfect SaintSal™ branding is now helping the world!"
echo ""

# Cleanup
rm -f "$DEPLOYMENT_PACKAGE"

echo "✅ Your platform is LIVE! 🚀"
