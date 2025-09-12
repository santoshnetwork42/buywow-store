# Buy Wow Frontend v3 - Replit Setup

## Overview
This is a Next.js-based e-commerce application for Buy Wow, successfully imported and configured for the Replit environment. The application is a modern frontend with features including product displays, shopping cart, checkout, blog functionality, and integration with various third-party services.

## Recent Changes (September 2025)
- Imported GitHub repository and configured for Replit environment
- Created development environment configuration (.env.local)
- Updated Next.js configuration for Replit proxy compatibility with cache control headers
- Installed dependencies with `--legacy-peer-deps` to resolve React version conflicts
- Set up development workflow running on port 5000
- Configured deployment settings for production (autoscale)
- **Added Cashfree Payment Gateway Integration**: Added Cashfree as a third payment gateway option alongside Razorpay and Gokwik
- **Enhanced Subrequest Caching**: Enabled cache interception in OpenNext config and optimized cache TTL settings for better Cloudflare Workers performance and reduced billing
- **Fixed Cloudflare Workers Subrequest Caching**: Updated cachedFetch to use `cf: { cacheEverything: true }` for GET requests and synthetic GET keys for POST/GraphQL requests to properly show cached subrequests in Cloudflare metrics

## Project Architecture
- **Frontend**: Next.js 14.2.8 with React 18.3.1
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux with Redux Toolkit and Redux Saga
- **Components**: Modular component architecture with blocks, common components, elements, features, and partials
- **APIs**: GraphQL integration with WordPress backend, AWS Amplify, and various third-party services
- **Build System**: Next.js with custom configuration for SEO redirects and rewrites
- **Deployment**: Configured for Cloudflare Workers (OpenNext.js) but also supports standard deployment

## Development Environment
- **Port**: 5000 (configured for Replit)
- **Host**: 0.0.0.0 (allows external access through Replit proxy)
- **Environment**: Development mode with hot reloading
- **Dependencies**: Installed with legacy peer deps support

## Key Features
- E-commerce functionality (products, collections, cart, checkout)
- Blog system with WordPress integration
- User account management
- **Multi-Gateway Payment System**: Supports Razorpay (default), Gokwik, and Cashfree payment gateways
  - Admin panel controlled via GOKWIK_ENABLED and CASHFREE_ENABLED flags
  - Dynamic gateway selection based on configuration
  - Fallback to Razorpay if other gateways are disabled
- Analytics and tracking (GTM, Vercel Analytics)
- Multiple third-party integrations (Limechat, Wisepops)

## Configuration Notes
- Environment variables are configured in .env.local for development
- Next.js config includes cache control headers for Replit compatibility
- Image optimization is configured for external media domains
- Extensive URL redirects and rewrites for SEO optimization

## Deployment
- **Target**: Autoscale (stateless web application)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- Ready for production deployment on Replit