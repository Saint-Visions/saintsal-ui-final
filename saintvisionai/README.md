# SaintVisionAI™ Platform

> **"SaintSal™ AI doesn't just answer. It adapts. It empowers. It becomes your... GOTTA GUY™!"**

## 🚀 About

SaintVisionAI™ is a revolutionary AI platform powered by SaintSal™ core technology, delivering the GOTTA GUY™ experience - an AI companion that doesn't just answer questions but truly understands and adapts to user needs.

## 🏗️ Project Structure

```
saintvisionai/
├── 📱 app/              # Next.js app router pages
├── 🧩 components/       # Reusable UI components
├── 📚 lib/              # Utility functions & integrations
├── 🎨 styles/           # Global styles & themes
├── 📋 types/            # TypeScript type definitions
├── 🌐 public/           # Static assets
├── 🔧 scripts/          # Deployment & utility scripts
│   ├── deploy-production.sh   ✅ Production deployment
│   └── deploy-staging.sh      🚧 Staging deployment
├── 📖 docs/             # Project documentation
├── 📦 package.json      # Dependencies & scripts
├── ⚙️ next.config.js    # Next.js configuration
├── 🔐 .env.production   # Production environment
└── 📖 README.md         # This file
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm 8+
- Azure CLI (for deployment)

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Azure
npm run deploy:azure
```

## 🚀 Deployment

### Azure Production Deployment

```bash
# From project root
./scripts/deploy-production.sh
```

The deployment script will:

- ✅ Verify Azure CLI & authentication
- ✅ Set correct Azure subscription
- ✅ Create/update App Service resources
- ✅ Build production bundle
- ✅ Deploy to Azure App Service
- ✅ Configure environment variables
- ✅ Provide live URL

## 🎯 Core Technologies

- **SaintSal™**: Core AI technology (patent pending)
- **SaintVisionAI™**: Customer-facing platform
- **GOTTA GUY™**: AI companion experience
- **Next.js 15**: React framework
- **TypeScript**: Type-safe development
- **Azure App Service**: Production hosting
- **Supabase**: Database & authentication

## 📊 Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start development server   |
| `npm run build`        | Build production bundle    |
| `npm run deploy:azure` | Deploy to Azure production |
| `npm run lint`         | Run ESLint                 |
| `npm run type-check`   | Check TypeScript types     |

## 🔐 Environment Variables

Production environment variables are configured in `.env.production`. Update with your actual service credentials before deployment.

## 📞 Support

For technical support and platform inquiries, contact the SaintSal Core Production Team.

---

**Powered by SaintSal™ Technology** | **Built for the GOTTA GUY™ Experience**
