# HerbTrace Frontend

A Next.js-based web application for managing agricultural supply chain operations with a focus on medicinal plants and Ayurvedic products. This frontend provides a modern, responsive interface for tracking herbs from cultivation to distribution.

## Overview

HerbTrace Frontend delivers a comprehensive dashboard for supply chain stakeholders to:

- Monitor herb cultivation and processing stages
- Track quality assurance protocols and testing results
- Manage user profiles across different roles (Farmers, Processors, Labs, etc.)
- Visualize supply chain data with interactive charts and real-time updates
- Access blockchain-verified transaction records

## System Requirements

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager
- Modern web browser with ES2020 support

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard pages and components
│   │   ├── login/              # Authentication pages
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout component
│   ├── components/
│   │   ├── ui/                 # Reusable UI components (shadcn/ui)
│   │   └── forms/              # Form components for different user roles
│   ├── contexts/               # React contexts for state management
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and configurations
│   └── services/               # API service functions
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and scripts
```

## Key Features

### Dashboard Management
- **Overview Dashboard**: Real-time supply chain metrics and activity feeds
- **Profile Management**: User registration and profile creation for different roles
- **Transaction Tracking**: Complete visibility of herb batches through the supply chain

### User Interface Components
- **Modern Design**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Interactive Charts**: Data visualization using Recharts
- **Form Validation**: Robust form handling with React Hook Form and Zod

### Authentication & Authorization
- **Role-based Access**: Different interfaces for Farmers, Processors, Labs, and Manufacturers
- **Secure Authentication**: Token-based authentication with context management
- **Profile Creation**: Dynamic forms based on user roles

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run format:staged` - Format staged files

## Technology Stack

### Core Framework
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type-safe JavaScript

### UI Components & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **shadcn/ui** - Pre-built component library

### Form Management & Validation
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### Data Visualization
- **Recharts** - React charting library
- **Embla Carousel** - Carousel component

### State Management
- **React Context** - Built-in state management
- **Next Themes** - Theme management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Turbopack** - Fast bundler for development

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

### Tailwind Configuration

The project uses Tailwind CSS 4 with custom configurations for:
- Extended color palette
- Custom animations
- Responsive breakpoints
- Component-specific utilities

### Next.js Configuration

Key configurations in `next.config.ts`:
- Package import optimizations for better performance
- Console removal in production builds
- Image optimization with WebP and AVIF formats

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error boundaries
- Follow the existing component structure

### Component Development
- Use shadcn/ui components as base
- Implement proper TypeScript interfaces
- Follow the established naming conventions
- Ensure responsive design principles

### Performance Optimization
- Leverage Next.js Image optimization
- Implement proper code splitting
- Use React.memo for expensive components
- Optimize bundle size with dynamic imports

## API Integration

The frontend integrates with the HerbTrace backend API for:
- User authentication and profile management
- Supply chain transaction processing
- Real-time data updates
- File uploads and document management

API services are centralized in `src/services/api.ts` for maintainability.

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Setup

Ensure all required environment variables are configured for production deployment.

### Performance Considerations

- Enable compression for static assets
- Configure proper caching headers
- Monitor Core Web Vitals
- Implement proper error tracking

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes following the coding standards
4. Run tests and linting
5. Submit a pull request with detailed description

## Security Features

- Input sanitization and validation
- Secure token storage
- CORS protection
- XSS prevention
- Secure authentication flows

## Error Handling

The application implements comprehensive error handling:
- Global error boundaries
- API error handling
- Form validation errors
- Network error recovery
- User-friendly error messages