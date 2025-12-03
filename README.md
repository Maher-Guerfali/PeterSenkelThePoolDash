# The Pool API Explorer

A beautiful and modern product management dashboard with API testing capabilities.

## Features

- 🎨 Modern, responsive UI with smooth animations
- 🔌 API testing interface for CRUD operations
- 📊 Real-time data visualization
- 📝 API request/response logging
- 🎯 MongoDB integration
- 🌊 Custom animations and design elements

## Tech Stack

This project is built with modern web technologies:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI component library
- **shadcn-ui** - Beautiful component collection
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd pool-product-portal-main

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## API Integration

The application connects to The Pool API for product management operations. Configure your API endpoint in the appropriate configuration files.

## License

All rights reserved.
