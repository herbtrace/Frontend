# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the frontend repository for Herbtrace, built with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (full component library installed)
- **Build Tool**: Turbopack (Next.js's bundler)
- **Package Manager**: npm

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles with Tailwind CSS
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page component
│   ├── components/
│   │   └── ui/                 # shadcn/ui components (45+ components)
│   ├── hooks/                  # Custom React hooks
│   └── lib/
│       └── utils.ts            # Utility functions (cn, etc.)
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS configuration
└── eslint.config.mjs          # ESLint configuration
```

## Available shadcn/ui Components

All major shadcn/ui components are installed and ready to use:
- Layout: Card, Separator, Aspect Ratio
- Navigation: Breadcrumb, Navigation Menu, Menubar, Pagination
- Forms: Button, Input, Textarea, Checkbox, Radio Group, Select, Switch, Label, Form
- Feedback: Alert, Alert Dialog, Toast (Sonner), Progress, Skeleton
- Overlays: Dialog, Sheet, Drawer, Popover, Hover Card, Tooltip, Context Menu, Dropdown Menu
- Data Display: Table, Badge, Avatar, Calendar, Carousel
- Interactive: Accordion, Collapsible, Tabs, Toggle, Toggle Group, Command, Resizable
- Advanced: Sidebar, Scroll Area, Slider, Input OTP

## Application Features

- **Landing Page**: Clean design with logo, metrics dashboard, and registration CTA
- **Authentication**: Simple dummy auth system (no real backend required)
- **Registration Flow**:
  1. User clicks "Register" → Login required if not authenticated
  2. After login → Role selection (Farmer, Lab, Manufacturer, Distributor)
  3. Dynamic forms based on selected role
  4. Form submission to backend API
- **Role-based Forms**:
  - Farmer: Farm details, crops, certifications
  - Quality Lab: Testing capabilities, equipment, accreditation
  - Manufacturer: Production capacity, product types, licenses
  - Distributor: Storage, transport, distribution areas

## Backend Integration

- API service layer in `src/services/api.ts`
- Currently uses simulated API calls for development
- Ready to integrate with real backend at `NEXT_PUBLIC_API_URL`
- Endpoints:
  - `POST /api/register/{role}` - Register new entities
  - `GET /api/metrics` - Dashboard metrics

## Development Notes

- Uses Turbopack for faster development and build times
- All components follow shadcn/ui patterns with Radix UI primitives
- Tailwind CSS v4 is configured with design tokens
- TypeScript strict mode enabled with proper type definitions
- ESLint configured with Next.js recommended rules
- Modular component structure for easy maintenance