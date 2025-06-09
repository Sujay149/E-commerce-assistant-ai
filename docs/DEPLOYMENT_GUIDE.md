# Deployment Guide

## Overview

This guide covers deploying the E-commerce AI Chatbot Platform to various hosting platforms and environments.

## Pre-Deployment Checklist

### Code Preparation

- [ ] All components tested and working
- [ ] TypeScript compilation successful
- [ ] No console errors in browser
- [ ] Responsive design verified on all devices
- [ ] Performance optimization completed
- [ ] Security best practices implemented

### Environment Setup

- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Analytics tracking implemented
- [ ] Error monitoring setup
- [ ] SSL certificate ready

## Build Process

### Production Build

```bash
# Install dependencies
npm install

# Run TypeScript checking
npm run type-check

# Create production build
npm run build

# Preview build locally (optional)
npm run preview
```

### Build Optimization

The build process includes:
- JavaScript minification
- CSS optimization
- Image compression
- Code splitting
- Tree shaking for unused code
- Asset fingerprinting for caching

## Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Optimized for React applications
- Automatic deployments from Git
- Built-in analytics
- Global CDN
- Serverless functions support

**Deployment Steps**:

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel
   ```

2. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**
   ```bash
   # Set environment variables
   vercel env add VITE_API_URL production
   vercel env add VITE_ANALYTICS_ID production
   ```

4. **Custom Domain**
   ```bash
   # Add custom domain
   vercel domains add yourdomain.com
   ```

### 2. Netlify

**Deployment Steps**:

1. **Connect Git Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings**
   ```yaml
   # netlify.toml
   [build]
     publish = "dist"
     command = "npm run build"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add production environment variables

### 3. GitHub Pages

**Deployment Steps**:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure Base URL**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/repository-name/',
     // ... other config
   });
   ```

### 4. AWS S3 + CloudFront

**Deployment Steps**:

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   # Install AWS CLI
   aws configure
   
   # Sync build folder
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **CloudFront Configuration**
   ```json
   {
     "DefaultRootObject": "index.html",
     "CustomErrorResponses": [
       {
         "ErrorCode": 404,
         "ResponseCode": 200,
         "ResponsePagePath": "/index.html"
       }
     ]
   }
   ```

### 5. Docker Deployment

**Dockerfile**:
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /static/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

**Build and Run**:
```bash
# Build Docker image
docker build -t ecommerce-chatbot .

# Run container
docker run -p 8080:80 ecommerce-chatbot
```

## Environment Configuration

### Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=E-commerce Chatbot
VITE_ANALYTICS_ID=your-analytics-id
VITE_SENTRY_DSN=your-sentry-dsn
```

### Configuration Files

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
```

## Performance Optimization

### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
})

# Build and analyze
npm run build
```

### Caching Strategy

**Service Worker** (Optional):
```javascript
// public/sw.js
const CACHE_NAME = 'ecommerce-chatbot-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## Monitoring and Analytics

### Error Monitoring with Sentry

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

### Analytics Setup

```typescript
// src/lib/analytics.ts
export const trackEvent = (eventName: string, properties?: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
};

// Usage in components
trackEvent('product_view', { product_id: product.id });
trackEvent('add_to_cart', { product_id: product.id, price: product.price });
```

## Security Configuration

### Content Security Policy

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.yourdomain.com;
">
```

### Headers Configuration

**Netlify** (_headers file):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

**Vercel** (vercel.json):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## Post-Deployment

### Health Checks

```typescript
// src/utils/healthCheck.ts
export const performHealthCheck = async () => {
  const checks = {
    api: false,
    database: false,
    cache: false
  };

  try {
    // Check API connectivity
    const response = await fetch('/api/health');
    checks.api = response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
  }

  return checks;
};
```

### Performance Monitoring

```typescript
// src/utils/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export const initPerformanceMonitoring = () => {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric);
}
```

## Troubleshooting

### Common Deployment Issues

**Build Failures**:
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review TypeScript errors
- Check for missing environment variables

**Runtime Errors**:
- Inspect browser console for errors
- Verify API endpoints are accessible
- Check CORS configuration
- Review network requests in DevTools

**Performance Issues**:
- Analyze bundle size
- Check for memory leaks
- Review image optimization
- Monitor Core Web Vitals

This deployment guide ensures your e-commerce chatbot platform is production-ready and performs optimally across all hosting environments.
