# Job Board Backend API

A comprehensive REST API for a job board platform built with Node.js, Express, and MongoDB.

## Features

- **Job Management**: CRUD operations for job postings
- **User Authentication**: JWT-based authentication for candidates and companies
- **Application System**: Multi-step job application process with file uploads
- **Advanced Filtering**: Search and filter jobs by various criteria
- **File Upload**: Resume and portfolio upload functionality
- **Security**: Rate limiting, input validation, and secure file handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new candidate
- `POST /api/auth/login` - Login candidate
- `POST /api/auth/company/register` - Register new company
- `POST /api/auth/company/login` - Login company
- `GET /api/auth/me` - Get current user info

### Jobs

- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create new job (Company auth required)
- `PUT /api/jobs/:id` - Update job (Company auth required)
- `DELETE /api/jobs/:id` - Delete job (Company auth required)
- `GET /api/jobs/categories` - Get job categories
- `GET /api/jobs/locations` - Get job locations

### Applications

- `POST /api/applications` - Submit job application
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id/status` - Update application status (Company)
- `GET /api/applications/job/:id` - Get applications for a job (Company)

### File Upload

- `POST /api/upload/resume` - Upload resume
- `POST /api/upload/portfolio` - Upload portfolio
- `POST /api/upload/company-logo` - Upload company logo
- `GET /api/upload/:type/:filename` - Serve uploaded files

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-board-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp config.env .env
   ```

   Update the `.env` file with your configuration:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job-board
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database (optional)**

   ```bash
   npm run seed
   ```

6. **Start the server**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## Database Models

### Job

- Basic job information (title, company, location, etc.)
- Skills and requirements
- Application count and status

### Company

- Company profile information
- Authentication credentials
- Verification status

### Candidate

- User profile and preferences
- Authentication credentials
- Application history

### Application

- Multi-step application data
- File attachments (resume, portfolio)
- Status tracking

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Comprehensive request validation
- **File Type Validation**: Secure file upload handling
- **CORS Configuration**: Cross-origin request security

## File Upload

The API supports file uploads for:

- **Resumes**: PDF, DOC, DOCX (max 5MB)
- **Portfolios**: PDF, ZIP (max 5MB)
- **Company Logos**: JPG, PNG (max 5MB)

Files are stored in the `uploads/` directory with organized subdirectories.

## Error Handling

Comprehensive error handling with:

- Validation errors
- Authentication errors
- File upload errors
- Database errors
- Custom error messages

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "errors": [ ... ]
}
```

## Development

### Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # MongoDB models
├── routes/          # API routes
├── utils/           # Utility functions
└── app.js           # Express app configuration
```

### Adding New Features

1. **Create Model**: Define MongoDB schema
2. **Create Controller**: Implement business logic
3. **Create Routes**: Define API endpoints
4. **Add Middleware**: Authentication, validation, etc.
5. **Update Frontend**: Integrate with React app

## Testing

The API can be tested using:

- **Postman**: Import the API collection
- **curl**: Command-line testing
- **Frontend Integration**: React application

## Deployment

1. **Environment Setup**: Configure production environment variables
2. **Database**: Set up MongoDB Atlas or local MongoDB
3. **File Storage**: Configure cloud storage for production
4. **Server**: Deploy to Heroku, AWS, or similar platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

