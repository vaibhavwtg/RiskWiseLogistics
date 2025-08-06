# RiskWise Tech - Enterprise Risk Management Platform

## Overview

RiskWise Tech is a specialized enterprise risk management platform designed specifically for logistics, freight forwarding, and customs broking operations. The application provides comprehensive risk assessment, compliance monitoring, incident management, and policy administration through an integrated web-based platform. The system features both public-facing content (blog, company information) and administrative capabilities for managing risk-related content and processes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing without React Router complexity
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom CSS variables for brand theming (RiskWise navy, red, gray color scheme)

### Backend Architecture
- **Runtime**: Node.js with TypeScript using ESM modules
- **Framework**: Express.js for REST API endpoints and middleware
- **Development Server**: TSX for TypeScript execution in development
- **API Structure**: RESTful endpoints under `/api` prefix with separate public and admin routes
- **Error Handling**: Centralized error middleware with consistent JSON error responses
- **Request Logging**: Custom middleware for API request/response logging with timing

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Connection**: Neon serverless driver for serverless-optimized database connections
- **Schema Design**: 
  - Users table with UUID primary keys
  - Blog posts table with slug-based routing, categories, and publish status
  - Shared schema definitions between frontend and backend

### Data Storage Strategy
- **Development**: In-memory storage implementation for rapid prototyping
- **Production**: PostgreSQL database with Drizzle ORM abstraction
- **Interface Pattern**: Storage interface abstraction allowing easy switching between implementations
- **Seeding**: Automated blog post seeding for development and demo purposes

### Authentication & Session Management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Session Security**: Secure session configuration for production deployment
- **User Management**: Basic user authentication with username/password

### Content Management
- **Blog System**: Full CRUD operations for blog posts with markdown content support
- **Admin Interface**: Separate admin routes for content management
- **Categories**: Predefined blog categories (Risk Management, Compliance, Technology, etc.)
- **Publishing Workflow**: Draft/published status with separate public and admin endpoints

### Form Handling & Validation
- **Form Management**: React Hook Form for performant form handling
- **Validation**: Zod schemas for runtime type validation shared between frontend and backend
- **Contact Forms**: Formspree integration for contact form submissions
- **Error Handling**: Comprehensive form validation with user-friendly error messages

### Development Tools & Configuration
- **Type Safety**: Comprehensive TypeScript configuration across full stack
- **Code Quality**: ESLint and TypeScript strict mode for code quality
- **Path Aliases**: Configured import aliases for clean code organization
- **Hot Reload**: Vite HMR for instant development feedback
- **Error Overlay**: Replit-specific error modal for development debugging

## External Dependencies

### Database Services
- **Neon**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations

### UI & Component Libraries
- **Radix UI**: Accessible, unstyled UI components (30+ components including Dialog, Select, Toast, etc.)
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant API for component styling

### Form & Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation and formatting utilities

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **PostCSS**: CSS processing with Tailwind CSS integration
- **ESBuild**: Fast JavaScript bundling for production builds

### External Services
- **Formspree**: Form submission handling for contact forms
- **Unsplash**: Image hosting for blog posts and marketing content
- **Replit**: Development environment with specialized plugins and error handling

### Runtime & Deployment
- **Node.js**: JavaScript runtime with ES modules support
- **Express.js**: Web application framework for API endpoints
- **Connect-pg-simple**: PostgreSQL session store for Express sessions
- **Production Deployment**: Ubuntu server with PostgreSQL, Nginx, and PM2
- **Database**: Standard PostgreSQL with TCP/IP connections (no WebSocket)
- **Process Management**: PM2 with clustering and auto-restart capabilities
- **Reverse Proxy**: Nginx with SSL support and static file serving