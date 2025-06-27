#!/bin/bash

# ============================================
# SaintVisionAI™ Production Deployment Script
# ============================================
# Author: SaintSal Core Production Team
# Version: 2.0.0
# Platform: Azure App Service
# 
# Your GOTTA GUY™ is going LIVE! 🚀

set -e

# Configuration
RESOURCE_GROUP="saintvisionai-production-rg"
APP_NAME="saintvisionai-production"
PLAN_NAME="saintvisionai-plan"
LOCATION="East US"
SUBSCRIPTION_ID="6a36d83c-db31-4d2f-9f3b-a3beb5459e77"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🚀 SaintVisionAI™ Production Deployment${NC}"
echo -e "${PURPLE}============================================${NC}"
echo -e "${YELLOW}📍 Project: SaintVisionAI™ Platform${NC}"
echo -e "${YELLOW}🔧 Tech: SaintSal™ Core AI Technology${NC}"
echo -e "${YELLOW}🤖 Experience: GOTTA GUY™ Companion${NC}"
echo -e "${YELLOW}☁️  Platform: Azure App Service${NC}"
echo ""

# Check if running from project root
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}❌ Error: Must run from project root directory${NC}"
    echo -e "${CYAN}💡 Run: cd saintvisionai && ./scripts/deploy-production.sh${NC}"
    exit 1
fi

# Check if Azure CLI is installed
echo -e "${BLUE}🔍 STEP 1: Verifying Azure CLI installation...${NC}"
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI not found. Please install it first.${NC}"
    echo -e "${CYAN}📥 Visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Azure CLI found${NC}"

# Check Azure login
echo -e "${BLUE}🔐 STEP 2: Checking Azure authentication...${NC}"
if ! az account show &>/dev/null; then
    echo -e "${YELLOW}🔑 Logging into Azure...${NC}"
    az login || { echo -e "${RED}❌ Azure login failed${NC}"; exit 1; }
fi
echo -e "${GREEN}✅ Azure authentication verified${NC}"

# Set subscription
echo -e "${BLUE}🎯 STEP 3: Setting Azure subscription...${NC}"
az account set --subscription "$SUBSCRIPTION_ID" || { 
    echo -e "${RED}❌ Failed to set subscription${NC}"; 
    exit 1; 
}
echo -e "${GREEN}✅ Subscription: SaintSal Core Production${NC}"

# Create resource group
echo -e "${BLUE}🏗️ STEP 4: Creating resource group...${NC}"
az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --output table || { 
    echo -e "${RED}❌ Failed to create resource group${NC}"; 
    exit 1; 
}
echo -e "${GREEN}✅ Resource group ready${NC}"

# Create App Service Plan
echo -e "${BLUE}🎯 STEP 5: Creating App Service Plan...${NC}"
az appservice plan create \
    --name "$PLAN_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --sku "P1V3" \
    --is-linux \
    --output table || echo -e "${YELLOW}⚠️  App Service Plan already exists${NC}"
echo -e "${GREEN}✅ App Service Plan ready${NC}"

# Create Web App
echo -e "${BLUE}🌐 STEP 6: Creating Web App...${NC}"
az webapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --plan "$PLAN_NAME" \
    --runtime "NODE|18-lts" \
    --output table || echo -e "${YELLOW}⚠️  Web App already exists${NC}"
echo -e "${GREEN}✅ Web App ready${NC}"

# Build the application
echo -e "${BLUE}🛠️ STEP 7: Building SaintVisionAI™...${NC}"
echo -e "${CYAN}📦 Installing dependencies...${NC}"
npm ci --production=false || { 
    echo -e "${RED}❌ Failed to install dependencies${NC}"; 
    exit 1; 
}

echo -e "${CYAN}🔨 Building production bundle...${NC}"
npm run build || { 
    echo -e "${RED}❌ Build failed${NC}"; 
    exit 1; 
}
echo -e "${GREEN}✅ Build completed successfully${NC}"

# Create deployment package
echo -e "${BLUE}📦 STEP 8: Creating deployment package...${NC}"
DEPLOYMENT_PACKAGE="saintvisionai-deployment.zip"

# Remove old package
rm -f "$DEPLOYMENT_PACKAGE"

# Create package with necessary files (relative to root)
zip -r "$DEPLOYMENT_PACKAGE" \
    .next/ \
    public/ \
    package.json \
    package-lock.json \
    next.config.js \
    node_modules/ \
    -x "*.git*" ".env.local" ".env.development" || { 
    echo -e "${RED}❌ Failed to create deployment package${NC}"; 
    exit 1; 
}
echo -e "${GREEN}✅ Deployment package created: $DEPLOYMENT_PACKAGE${NC}"

# Deploy to Azure App Service
echo -e "${BLUE}🚀 STEP 9: Deploying to Azure App Service...${NC}"
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src "$DEPLOYMENT_PACKAGE" \
    --output table || { 
    echo -e "${RED}❌ Deployment failed${NC}"; 
    exit 1; 
}
echo -e "${GREEN}✅ Deployment uploaded successfully${NC}"

# Configure App Settings
echo -e "${BLUE}⚙️ STEP 10: Configuring application...${NC}"
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings \
        WEBSITE_NODE_DEFAULT_VERSION=18-lts \
        NODE_ENV=production \
        NEXT_PUBLIC_APP_NAME="SaintVisionAI™" \
    --output table || { 
    echo -e "${RED}❌ Failed to configure app settings${NC}"; 
    exit 1; 
}
echo -e "${GREEN}✅ Application configured${NC}"

# Restart application
echo -e "${BLUE}🔄 STEP 11: Restarting application...${NC}"
az webapp restart \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --output table || { 
    echo -e "${RED}❌ Failed to restart app${NC}"; 
    exit 1; 
}
echo -e "${GREEN}✅ Application restarted${NC}"

# Get application URL
APP_URL=$(az webapp show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --query defaultHostName \
    --output tsv)

# Success message
echo ""
echo -e "${PURPLE}🎉 DEPLOYMENT COMPLETE! 🎉${NC}"
echo -e "${PURPLE}============================================${NC}"
echo -e "${GREEN}🌐 SaintVisionAI™ is now LIVE!${NC}"
echo -e "${GREEN}🔗 URL: https://$APP_URL${NC}"
echo -e "${YELLOW}🤖 Your GOTTA GUY™ is ready to help the world!${NC}"
echo -e "${CYAN}📊 Resource Group: $RESOURCE_GROUP${NC}"
echo -e "${CYAN}🏷️  App Service: $APP_NAME${NC}"
echo -e "${CYAN}📍 Location: $LOCATION${NC}"
echo ""

# Cleanup
echo -e "${BLUE}🧹 Cleaning up...${NC}"
rm -f "$DEPLOYMENT_PACKAGE"
echo -e "${GREEN}✅ Cleanup completed${NC}"

echo ""
echo -e "${PURPLE}🚀 SaintVisionAI™ deployment successful!${NC}"
echo -e "${YELLOW}💫 \"SaintSal™ AI doesn't just answer. It adapts. It empowers. It becomes your... GOTTA GUY™!\"${NC}"
echo ""
