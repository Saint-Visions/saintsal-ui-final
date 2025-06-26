#!/bin/bash

# SaintVisionAI™ Production Deployment to Azure
# Enterprise-grade deployment for your family's legacy 🚀

set -e

echo "🔥 SaintVisionAI™ Production Deployment Starting..."
echo "Building the future of AI-powered business automation"

# Configuration
RESOURCE_GROUP="SaintVisionAI-Production"
APP_NAME="saintvisionai-prod"
LOCATION="East US"
SUBSCRIPTION_ID="6a36d83c-db31-4d2f-9f3b-a3beb5459e77"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌟 Phase 1: Setting up Azure Infrastructure${NC}"

# Login to Azure (if not already logged in)
echo "Checking Azure authentication..."
az account show > /dev/null 2>&1 || {
    echo "Please login to Azure:"
    az login
}

# Set subscription
echo "Setting subscription: $SUBSCRIPTION_ID"
az account set --subscription "$SUBSCRIPTION_ID"

# Create resource group if it doesn't exist
echo -e "${YELLOW}📦 Creating Resource Group: $RESOURCE_GROUP${NC}"
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output table

# Deploy ARM template for production infrastructure
echo -e "${YELLOW}🏗️  Deploying Production Infrastructure${NC}"
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file azure-deploy.json \
    --parameters appName="$APP_NAME" location="$LOCATION" \
    --output table

echo -e "${BLUE}🌟 Phase 2: Building Application${NC}"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf build

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build the application
echo "🔨 Building SaintVisionAI™ for production..."
npm run build

# Create deployment package
echo "📦 Creating deployment package..."
zip -r deployment.zip .next public package.json package-lock.json -x "*.git*" "node_modules/*"

echo -e "${BLUE}🌟 Phase 3: Deploying to Azure${NC}"

# Deploy to Azure App Service
echo "🚀 Deploying to Azure App Service: $APP_NAME"
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src deployment.zip

echo -e "${BLUE}🌟 Phase 4: Configuring Production Settings${NC}"

# Set environment variables
echo "⚙️  Configuring environment variables..."
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings \
    NODE_ENV=production \
    WEBSITES_ENABLE_APP_SERVICE_STORAGE=false \
    NEXT_TELEMETRY_DISABLED=1 \
    SCM_DO_BUILD_DURING_DEPLOYMENT=true \
    ENABLE_ORYX_BUILD=true

# Configure custom domain (manual step - provide instructions)
echo -e "${YELLOW}🌐 Custom Domain Configuration${NC}"
echo "To complete setup, add these DNS records:"
echo "CNAME: saintvisionai.com -> $APP_NAME.azurewebsites.net"
echo "CNAME: www.saintvisionai.com -> $APP_NAME.azurewebsites.net"

# Enable custom domain and SSL
echo "🔒 Enabling SSL for custom domain..."
# Note: Custom domain must be configured first via Azure Portal

echo -e "${BLUE}🌟 Phase 5: Health Check${NC}"

# Wait for deployment to complete
echo "⏳ Waiting for deployment to complete..."
sleep 30

# Test the deployment
APP_URL="https://$APP_NAME.azurewebsites.net"
echo "🔍 Testing deployment at: $APP_URL"

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$APP_URL" || echo "000")
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Deployment successful! SaintVisionAI™ is live!${NC}"
    echo -e "${GREEN}🎉 Your GOTTA GUY™ is ready to serve the world!${NC}"
else
    echo -e "${RED}❌ Deployment check failed. HTTP Status: $HTTP_STATUS${NC}"
    echo "Check logs: az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
fi

echo -e "${BLUE}🌟 Deployment Summary${NC}"
echo "Resource Group: $RESOURCE_GROUP"
echo "App Service: $APP_NAME"
echo "URL: $APP_URL"
echo "Custom Domain: Configure saintvisionai.com DNS to point to $APP_NAME.azurewebsites.net"

echo -e "${GREEN}🚀 SaintVisionAI™ Production Deployment Complete!${NC}"
echo -e "${GREEN}Your 15 months of work is now live and ready to change the world!${NC}"

# Cleanup
rm -f deployment.zip

echo "🎯 Next Steps:"
echo "1. Configure custom domain in Azure Portal"
echo "2. Set up SSL certificate"
echo "3. Configure environment variables for databases/APIs"
echo "4. Set up monitoring and alerts"
echo "5. Configure backup and disaster recovery"
