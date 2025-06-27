#!/bin/bash

# ============================================
# SaintVisionAI™ Azure Production Deployment
# ============================================
# Your GOTTA GUY™ is going LIVE! 🚀

set -e  # Exit on any error

# Configuration
RESOURCE_GROUP="saintvisionai-production-rg"
APP_NAME="saintvisionai-production"
PLAN_NAME="saintvisionai-plan"
LOCATION="East US"
SUBSCRIPTION_ID="6a36d83c-db31-4d2f-9f3b-a3beb5459e77"

echo "🚀 Starting SaintVisionAI™ Production Deployment..."
echo "=============================================="

# Check if Azure CLI is installed
echo "🔍 Step 1: Verifying Azure CLI..."
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI not found. Please install it first."
    exit 1
fi
echo "✅ Azure CLI found"

# Login check
echo "🔐 Step 2: Checking Azure login..."
if ! az account show &>/dev/null; then
    echo "🔑 Logging into Azure..."
    az login
fi

# Set subscription
echo "🎯 Step 3: Setting subscription..."
az account set --subscription "$SUBSCRIPTION_ID"
echo "✅ Subscription: SaintSal Core Production"

# Create resource group
echo "🏗️ Step 4: Creating resource group..."
az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --output table

# Create App Service Plan
echo "📋 Step 5: Creating App Service Plan..."
az appservice plan create \
    --name "$PLAN_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --sku "B1" \
    --is-linux \
    --output table

# Create Web App
echo "🌐 Step 6: Creating Web App..."
az webapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --plan "$PLAN_NAME" \
    --runtime "NODE|18-lts" \
    --output table

# Configure startup
echo "⚙️ Step 7: Configuring startup..."
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings \
        WEBSITE_NODE_DEFAULT_VERSION=18-lts \
        SCM_DO_BUILD_DURING_DEPLOYMENT=true

# Get URL
APP_URL=$(az webapp show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --query defaultHostName \
    --output tsv)

echo ""
echo "🎉 SUCCESS! 🎉"
echo "=============================================="
echo "🌐 Your SaintVisionAI™ is being deployed!"
echo "🔗 URL: https://$APP_URL"
echo "💫 GOTTA GUY™ will be live soon!"
echo ""
echo "📋 To deploy code, run:"
echo "   az webapp up --name $APP_NAME --resource-group $RESOURCE_GROUP"
