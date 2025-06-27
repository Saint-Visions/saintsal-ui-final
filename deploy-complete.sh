#!/bin/bash

echo "🔍 STEP 1: Verifying Azure CLI installation..."
az --version || { echo "❌ Azure CLI not found. Please install it first."; exit 1; }

echo "🔐 STEP 2: Logging into Azure..."
az login || { echo "❌ Azure login failed."; exit 1; }

echo "🚀 STEP 3: Deploying your beautiful SaintVisionAI™ platform..."

echo "🔧 Setting Azure subscription..."
az account set --subscription "6a36d83c-db31-4d2f-9f3b-a3beb5459e77" || { echo "❌ Failed to set subscription."; exit 1; }

echo "🏗️ Creating resource group..."
az group create --name "saintvisionai-production-rg" --location "East US" || { echo "❌ Failed to create resource group."; exit 1; }

echo "🎯 Creating App Service Plan..."
az appservice plan create \
    --name "saintvisionai-plan" \
    --resource-group "saintvisionai-production-rg" \
    --sku "P1V3" \
    --is-linux || { echo "❌ Failed to create App Service plan."; exit 1; }

echo "🌐 Creating Web App..."
az webapp create \
    --name "saintvisionai-production" \
    --resource-group "saintvisionai-production-rg" \
    --plan "saintvisionai-plan" \
    --runtime "NODE|18-lts" || { echo "❌ Failed to create Web App."; exit 1; }

echo "🛠️ Building SaintVisionAI™..."
npm run build || { echo "❌ Build failed."; exit 1; }

echo "📦 Creating deployment package..."
zip -r deployment.zip .next/ public/ package.json package-lock.json next.config.js || { echo "❌ Failed to create package."; exit 1; }

echo "🚀 Deploying to Azure App Service..."
az webapp deployment source config-zip \
    --resource-group "saintvisionai-production-rg" \
    --name "saintvisionai-production" \
    --src deployment.zip || { echo "❌ Deployment failed."; exit 1; }

echo "⚙️ Configuring App Settings..."
az webapp config appsettings set \
    --resource-group "saintvisionai-production-rg" \
    --name "saintvisionai-production" \
    --settings WEBSITE_NODE_DEFAULT_VERSION=18-lts || { echo "❌ Failed to set app settings."; exit 1; }

echo "🔄 Restarting application..."
az webapp restart \
    --resource-group "saintvisionai-production-rg" \
    --name "saintvisionai-production" || { echo "❌ Failed to restart app."; exit 1; }

echo "🎉 SUCCESS! Your beautiful SaintVisionAI™ platform is now LIVE!"
echo "🌐 URL: https://saintvisionai-production.azurewebsites.net"
echo "💫 Your GOTTA GUY™ is ready to help the world!"

# Cleanup
rm -f deployment.zip

echo "✅ Deployment complete! Your platform is live and thriving!"
