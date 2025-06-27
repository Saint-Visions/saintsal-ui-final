#!/bin/bash

echo "🚀 SaintVisionAI™ Azure Deployment (Basic SKU)"
echo "=============================================="

# Configuration  
RESOURCE_GROUP="saintvisionai-production-rg"
APP_NAME="saintvisionai-production"
PLAN_NAME="saintvisionai-plan"
SUBSCRIPTION_ID="6a36d83c-db31-4d2f-9f3b-a3beb5459e77"

echo "🔧 Setting subscription..."
az account set --subscription "$SUBSCRIPTION_ID"

echo "📦 Ensuring resource group exists..."
az group create --name "$RESOURCE_GROUP" --location "East US"

echo "🏗️ Creating App Service Plan (Basic B1 - no quota needed)..."
az appservice plan create \
    --name "$PLAN_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --sku "B1" \
    --is-linux

echo "🌐 Creating Web App..."
az webapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --plan "$PLAN_NAME" \
    --runtime "NODE|18-lts"

echo "⚙️ Configuring app settings..."
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings \
        WEBSITE_NODE_DEFAULT_VERSION=18-lts \
        SCM_DO_BUILD_DURING_DEPLOYMENT=true \
        NODE_ENV=production

echo "🚀 Deploying your beautiful SaintVisionAI™..."
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src deployment.zip

echo ""
echo "🎉 SUCCESS! Your GOTTA GUY™ is LIVE!"
echo "🌐 URL: https://saintvisionai-production.azurewebsites.net"
echo "💫 SaintSal™ AI is now helping the world!"
