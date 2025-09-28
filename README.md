# ALX Project Nexus JobFlow

A modern, full-stack job board platform built with React, Node.js, and MongoDB. This application allows job seekers to search and apply for jobs, while companies can post job listings and manage applications.

## 🚀 Features

### For Job Seekers

- **Advanced Job Search**: Search jobs by keywords, location, company, and more
- **Smart Filtering**: Filter by job type, experience level, salary range, remote options
- **Job Application**: Easy application process with file uploads for resumes and portfolios
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Radix UI components and Tailwind CSS

### For Companies

- **Job Posting**: Create and manage job listings
- **Application Management**: View and manage job applications
- **Company Profiles**: Upload company logos and maintain company information
- **Analytics**: Track application metrics and job performance

### Technical Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **File Upload**: Support for resume, portfolio, and company logo uploads
- **Rate Limiting**: API protection against abuse
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Comprehensive error handling and validation
- **Docker Support**: Containerized deployment with Docker Compose

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/Vite)  │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
alx-project-nexus-jobflow/
├── job-board-backend/          # Node.js/Express API
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Authentication, validation, upload
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   └── utils/             # Utility functions
│   ├── uploads/               # File upload storage
│   └── config.env             # Environment configuration
├── job-board-platform/        # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service layer
│   │   └── utils/             # Utility functions
│   └── public/                # Static assets
├── docker-compose.yml         # Docker orchestration
└── deployment-guide.md        # Deployment instructions
```

## 🛠️ Technology Stack

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email functionality

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PM2** - Process management (production)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd alx-project-nexus-jobflow
```

### 2. Environment Setup

```bash
# Copy environment template
cp job-board-backend/config.env.example job-board-backend/config.env

# Edit the config.env file with your settings
```

### 3. Start with Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### 4. Manual Setup (Alternative)

```bash
# Backend setup
cd job-board-backend
npm install
npm run dev

# Frontend setup (new terminal)
cd job-board-platform
npm install
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Job Endpoints

- `GET /api/jobs` - Get all jobs (with filtering)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (authenticated)
- `PUT /api/jobs/:id` - Update job (authenticated)
- `DELETE /api/jobs/:id` - Delete job (authenticated)

### Application Endpoints

- `GET /api/applications` - Get user applications
- `POST /api/applications` - Submit job application
- `GET /api/applications/:id` - Get application details

### Upload Endpoints

- `POST /api/upload/resume` - Upload resume
- `POST /api/upload/portfolio` - Upload portfolio
- `POST /api/upload/company-logo` - Upload company logo

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobboard
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
MAX_FILE_SIZE=5242880
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (Vite)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🐳 Docker Deployment

### Development

```bash
docker-compose up -d
```

### Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml up -d
```

## 📦 Available Scripts

### Backend

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🧪 Testing

### Backend Testing

```bash
cd job-board-backend
npm test
```

### Frontend Testing

```bash
cd job-board-platform
npm run test
```

## 📊 Database Schema

### Models

- **User**: Authentication and profile information
- **Job**: Job listings with company details
- **Application**: Job applications with file attachments
- **Company**: Company profiles and information

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: API protection against abuse
- **CORS Configuration**: Proper cross-origin setup
- **Input Validation**: Request validation and sanitization
- **File Upload Security**: Type and size restrictions
- **Helmet.js**: Security headers

## 🚀 Deployment

### Production Deployment Options

1. **Docker Compose** - Single server deployment
2. **Separate Services** - Deploy frontend and backend separately
3. **Cloud Platforms** - Deploy to AWS, GCP, or Azure

See [deployment-guide.md](./deployment-guide.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the [deployment guide](./deployment-guide.md)
- Review the API documentation above

## 🙏 Acknowledgments

- ALX Software Engineering Program
- React and Node.js communities
- Open source contributors

---

**Built with ❤️ by Ermili Mohamed ALX Cohort 2-TL-ProDev-FE**

