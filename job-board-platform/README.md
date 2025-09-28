# Job Board Frontend Platform

A modern, responsive React application for the ALX Project Nexus JobFlow platform. Built with TypeScript, Vite, and Tailwind CSS, this frontend provides an intuitive interface for job seekers and employers.

## 🚀 Features

### For Job Seekers

- **Advanced Search**: Search jobs by keywords, location, company name
- **Smart Filters**: Filter by job type, experience level, salary range, remote options
- **Job Discovery**: Browse job listings with detailed information
- **Application Process**: Easy job application with file uploads
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Beautiful interface with Radix UI components

### For Employers

- **Job Posting**: Create and manage job listings
- **Company Profiles**: Upload company logos and maintain profiles
- **Application Management**: View and manage job applications
- **Analytics Dashboard**: Track job performance metrics

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Modern React**: Built with React 19 and latest hooks
- **Fast Build**: Vite for lightning-fast development and builds
- **Component Library**: Radix UI for accessible, customizable components
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Custom hooks for efficient state management
- **API Integration**: Seamless backend communication

## 🛠️ Technology Stack

### Core Technologies

- **React 19** - UI framework with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components & Icons

- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Conditional class merging

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - React support for Vite

## 📁 Project Structure

```
job-board-platform/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (Radix-based)
│   │   ├── Header.tsx    # Application header
│   │   ├── SearchBar.tsx # Job search functionality
│   │   ├── Filters.tsx   # Job filtering components
│   │   ├── JobCard.tsx   # Individual job display
│   │   ├── JobGrid.tsx   # Job listings grid
│   │   ├── JobApplicationModal.tsx # Application modal
│   │   └── ResultsHeader.tsx # Search results header
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service layer
│   ├── lib/              # Utility libraries
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── eslint.config.js      # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory**

```bash
cd job-board-platform
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

```bash
# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

4. **Start development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Optional: Analytics, Sentry, etc.
VITE_APP_NAME=JobFlow Platform
VITE_APP_VERSION=1.0.0
```

## 📱 Component Architecture

### Core Components

#### Header Component

- Navigation bar
- User authentication status
- Theme toggle
- Mobile-responsive menu

#### SearchBar Component

- Job search input
- Location autocomplete
- Search suggestions
- Keyboard navigation

#### Filters Component

- Job type filters
- Experience level filters
- Salary range slider
- Remote work options
- Date posted filters

#### JobCard Component

- Job title and company
- Location and type
- Salary information
- Application button
- Save job functionality

#### JobApplicationModal Component

- Application form
- File upload (resume, portfolio)
- Cover letter input
- Form validation
- Submission handling

### UI Components (Radix-based)

The project includes a comprehensive set of reusable UI components:

- **Button** - Various button styles and sizes
- **Input** - Form inputs with validation states
- **Dialog** - Modal dialogs and overlays
- **Select** - Dropdown selections
- **Checkbox/Radio** - Form controls
- **Slider** - Range inputs for salary filters
- **Tabs** - Tabbed interfaces
- **Toast** - Notification system
- **Avatar** - User profile images
- **Badge** - Status indicators
- **Card** - Content containers

## 🔌 API Integration

### Service Layer

The `services/api.ts` file handles all backend communication:

```typescript
// Example API service
export const jobService = {
  getJobs: (filters: JobFilters) => api.get("/jobs", { params: filters }),

  getJob: (id: string) => api.get(`/jobs/${id}`),

  applyToJob: (jobId: string, application: JobApplication) =>
    api.post(`/applications`, { jobId, ...application }),
};
```

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Build verification
npm run build:check
```

### Deployment Options

#### Static Hosting

- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

#### Docker Deployment

```bash
# Build Docker image
docker build -t jobboard-frontend .

# Run container
docker run -p 80:80 jobboard-frontend
```

## 🛠️ Development Workflow

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📚 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:ignore  # Run ESLint with warnings ignored
```

## 🆘 Troubleshooting

### Common Issues

**Build Errors:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type Errors:**

```bash
# Check TypeScript configuration
npm run build:check
```

**Styling Issues:**

```bash
# Rebuild Tailwind CSS
npm run build
```

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for ALX Software Engineering Program**
