# Job Board Backend API

A robust Node.js/Express.js REST API for the ALX Project Nexus JobFlow platform. This backend provides authentication, job management, file uploads, and application handling services.

## 🚀 Features

- **RESTful API Design** - Clean, intuitive API endpoints
- **JWT Authentication** - Secure token-based authentication system
- **File Upload Support** - Resume, portfolio, and company logo uploads
- **MongoDB Integration** - Mongoose ODM for database operations
- **Email Notifications** - Nodemailer integration for application notifications
- **Rate Limiting** - Protection against API abuse
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Centralized error handling middleware
- **CORS Configuration** - Cross-origin resource sharing setup
- **Security Headers** - Helmet.js for security headers

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email functionality
- **Express Validator** - Input validation
- **Morgan** - HTTP request logger
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
job-board-backend/
├── src/
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── applicationController.js
│   │   └── uploadController.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # Authentication middleware
│   │   ├── upload.js       # File upload middleware
│   │   └── validation.js   # Input validation middleware
│   ├── models/            # Database models
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Company.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   └── upload.js
│   ├── utils/             # Utility functions
│   │   └── seedData.js
│   ├── config/            # Configuration files
│   │   └── database.js
│   └── app.js             # Express app configuration
├── uploads/               # File upload storage
│   ├── resumes/
│   ├── portfolios/
│   └── company-logos/
├── server.js              # Server entry point
├── seed.js                # Database seeding script
├── package.json           # Dependencies and scripts
├── Dockerfile             # Docker configuration
└── config.env             # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**

```bash
cd job-board-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

```bash
# Copy the environment template
cp config.env.example config.env

# Edit config.env with your configuration
```

4. **Start MongoDB**

```bash
# If using local MongoDB
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:7
```

5. **Seed the database (optional)**

```bash
npm run seed
```

6. **Start the development server**

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create a `config.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/jobboard

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Database Models

#### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (candidate|employer),
  profile: {
    bio: String,
    skills: [String],
    experience: String,
    location: String
  }
}
```

#### Job Model

```javascript
{
  title: String,
  description: String,
  requirements: [String],
  location: String,
  type: String (full-time|part-time|contract|internship),
  category: String,
  salaryRange: {
    min: Number,
    max: Number
  },
  company: ObjectId (ref: Company),
  postedBy: ObjectId (ref: User),
  status: String (active|paused|closed),
  remote: Boolean
}
```

#### Application Model

```javascript
{
  job: ObjectId (ref: Job),
  candidate: ObjectId (ref: User),
  coverLetter: String,
  resume: String,
  portfolio: String,
  status: String (pending|reviewed|accepted|rejected),
  appliedAt: Date
}
```

#### Company Model

```javascript
{
  name: String,
  description: String,
  website: String,
  logo: String,
  location: String,
  size: String,
  industry: String,
  owner: ObjectId (ref: User)
}
```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description       | Auth Required |
| ------ | ----------- | ----------------- | ------------- |
| POST   | `/register` | User registration | No            |
| POST   | `/login`    | User login        | No            |
| POST   | `/logout`   | User logout       | Yes           |
| GET    | `/me`       | Get current user  | Yes           |

### Job Routes (`/api/jobs`)

| Method | Endpoint | Description                 | Auth Required  |
| ------ | -------- | --------------------------- | -------------- |
| GET    | `/`      | Get all jobs (with filters) | No             |
| GET    | `/:id`   | Get job by ID               | No             |
| POST   | `/`      | Create new job              | Yes (Employer) |
| PUT    | `/:id`   | Update job                  | Yes (Owner)    |
| DELETE | `/:id`   | Delete job                  | Yes (Owner)    |

### Application Routes (`/api/applications`)

| Method | Endpoint | Description               | Auth Required        |
| ------ | -------- | ------------------------- | -------------------- |
| GET    | `/`      | Get user applications     | Yes (Candidate)      |
| POST   | `/`      | Submit job application    | Yes (Candidate)      |
| GET    | `/:id`   | Get application details   | Yes (Owner/Employer) |
| PUT    | `/:id`   | Update application status | Yes (Employer)       |

### Upload Routes (`/api/upload`)

| Method | Endpoint        | Description         | Auth Required   |
| ------ | --------------- | ------------------- | --------------- |
| POST   | `/resume`       | Upload resume       | Yes (Candidate) |
| POST   | `/portfolio`    | Upload portfolio    | Yes (Candidate) |
| POST   | `/company-logo` | Upload company logo | Yes (Employer)  |

### Utility Routes

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| GET    | `/health` | API health check |

## 🔍 API Usage Examples

### Authentication

**Register a new user:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "candidate"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Jobs

**Get all jobs with filters:**

```bash
curl "http://localhost:5000/api/jobs?category=tech&location=remote&type=full-time"
```

**Create a new job (requires authentication):**

```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Senior Developer",
    "description": "Looking for an experienced developer...",
    "requirements": ["JavaScript", "React", "Node.js"],
    "location": "Remote",
    "type": "full-time",
    "category": "tech",
    "salaryRange": {"min": 80000, "max": 120000},
    "remote": true
  }'
```

### File Uploads

**Upload resume:**

```bash
curl -X POST http://localhost:5000/api/upload/resume \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "resume=@/path/to/resume.pdf"
```

## 🔒 Security Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (candidate/employer)
- Password hashing with bcrypt
- Token expiration handling

### Input Validation

- Express-validator for request validation
- File type and size restrictions
- SQL injection prevention (NoSQL)
- XSS protection

### Rate Limiting

- 100 requests per 15 minutes per IP
- Configurable limits per endpoint
- Abuse prevention

### File Upload Security

- File type validation
- File size limits (5MB default)
- Secure file storage
- Path traversal protection

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Test Coverage

```bash
npm run test:coverage
```

### API Testing with Postman

Import the Postman collection from `/docs/postman-collection.json`

## 📊 Database Seeding

### Seed Sample Data

```bash
npm run seed
```

This will create:

- Sample users (candidates and employers)
- Sample companies
- Sample job listings
- Sample applications

### Custom Seeding

Edit `src/utils/seedData.js` to customize seed data.

## 🚀 Production Deployment

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monit
```

### Using Docker

```bash
# Build image
docker build -t jobboard-backend .

# Run container
docker run -p 5000:5000 jobboard-backend
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-super-secure-production-secret
EMAIL_HOST=your-smtp-host
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📈 Monitoring & Logging

### Logging

- Morgan for HTTP request logging
- Console logging for development
- Structured logging for production

### Health Checks

- `/api/health` endpoint for uptime monitoring
- Database connection status
- Service availability checks

## 🐛 Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request
- **Authentication Errors**: 401 Unauthorized
- **Authorization Errors**: 403 Forbidden
- **Not Found Errors**: 404 Not Found
- **File Upload Errors**: 400 Bad Request
- **Server Errors**: 500 Internal Server Error

All errors return a consistent JSON format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for ALX Software Engineering Program**
