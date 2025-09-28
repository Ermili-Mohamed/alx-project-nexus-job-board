# 🚀 Job Board Application Deployment Guide

This guide covers multiple deployment options for your job board application with backend (Node.js/Express), frontend (React/Vite), and Next.js components.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- MongoDB Atlas account (for production database)
- Cloud platform accounts (Railway, Vercel, etc.)

## 🏗️ Project Structure

```
job-board-backend/     # Node.js/Express API
job-board-platform/    # React/Vite Frontend
jobAlx/               # Next.js Frontend
```

## 🚀 Deployment Options

### Option 1: Cloud Platform Deployment (Recommended)

#### Backend Deployment

**Platforms:** Railway, Render, Heroku, DigitalOcean App Platform

**Steps for Railway:**

1. Push code to GitHub
2. Connect Railway to your GitHub repository
3. Set environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
   JWT_SECRET=your-super-secure-jwt-secret
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ```
4. Deploy automatically

#### Frontend Deployment (React/Vite)

**Platforms:** Vercel, Netlify, Railway

**Steps for Vercel:**

1. Connect GitHub repository
2. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Set environment variables:
   ```
   VITE_API_BASE_URL=https://your-backend-api.railway.app/api
   ```
4. Deploy

#### Next.js Frontend Deployment

**Platforms:** Vercel (optimized)

**Steps:**

1. Connect GitHub repository
2. Vercel auto-detects Next.js
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.railway.app/api
   ```
4. Deploy

### Option 2: Docker Deployment

#### Using Docker Compose (Local/Server)

1. **Build and run all services:**

   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

#### Using Docker Swarm (Production)

1. **Initialize swarm:**

   ```bash
   docker swarm init
   ```

2. **Deploy stack:**
   ```bash
   docker stack deploy -c docker-compose.yml jobboard
   ```

### Option 3: VPS/Server Deployment

#### Using PM2 (Process Manager)

1. **Install PM2 globally:**

   ```bash
   npm install -g pm2
   ```

2. **Deploy backend:**

   ```bash
   cd job-board-backend
   pm2 start server.js --name "jobboard-backend"
   pm2 save
   pm2 startup
   ```

3. **Deploy frontend:**
   ```bash
   cd job-board-platform
   npm run build
   # Serve with nginx or serve package
   ```

#### Using Nginx as Reverse Proxy

1. **Install Nginx:**

   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Configure Nginx:**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           root /path/to/frontend/dist;
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 🔧 Environment Configuration

### Backend Environment Variables

Create `.env.production` in `job-board-backend/`:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobboard
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-app-specific-password
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend Environment Variables

Create `.env.production` in `job-board-platform/`:

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_APP_NAME=Job Board Platform
VITE_APP_VERSION=1.0.0
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. Create MongoDB Atlas account
2. Create a new cluster
3. Create database user
4. Whitelist your IP addresses
5. Get connection string
6. Update `MONGODB_URI` in environment variables

### Local MongoDB (Development)

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7

# Or install locally
# Follow MongoDB installation guide for your OS
```

## 📁 File Upload Configuration

### For Cloud Platforms

Use cloud storage services:

- AWS S3
- Cloudinary
- Firebase Storage

### For VPS/Server

Ensure upload directories exist:

```bash
mkdir -p uploads/company-logos uploads/portfolios uploads/resumes
chmod 755 uploads/
```

## 🔒 Security Considerations

1. **Environment Variables:**

   - Never commit `.env` files
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **Database Security:**

   - Use strong passwords
   - Enable authentication
   - Whitelist IP addresses

3. **CORS Configuration:**

   - Set specific origins
   - Don't use wildcards in production

4. **File Uploads:**
   - Validate file types
   - Set size limits
   - Scan for malware

## 🚀 Quick Start Commands

### Development

```bash
# Backend
cd job-board-backend
npm install
npm run dev

# Frontend
cd job-board-platform
npm install
npm run dev

# Next.js
cd jobAlx
npm install
npm run dev
```

### Production

```bash
# Using Docker
docker-compose up --build -d

# Using PM2
pm2 start ecosystem.config.js
```

## 📊 Monitoring and Logs

### PM2 Monitoring

```bash
pm2 monit
pm2 logs
```

### Docker Logs

```bash
docker-compose logs -f
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        # Add Railway deployment steps

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        # Add Vercel deployment steps
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors:**

   - Check CORS_ORIGIN configuration
   - Ensure frontend URL is whitelisted

2. **Database Connection:**

   - Verify MongoDB URI
   - Check network connectivity
   - Ensure database user has proper permissions

3. **File Upload Issues:**

   - Check upload directory permissions
   - Verify file size limits
   - Ensure proper MIME type validation

4. **Environment Variables:**
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure proper escaping of special characters

## 📞 Support

For deployment issues:

1. Check application logs
2. Verify environment configuration
3. Test database connectivity
4. Check cloud platform status pages

## 🌐 Domain and SSL Configuration

### Custom Domain Setup

1. **Purchase a domain** from providers like Namecheap, GoDaddy, or Cloudflare
2. **Configure DNS records:**
   - A record pointing to your server IP (VPS deployment)
   - CNAME record pointing to your platform URL (cloud platforms)
3. **Update CORS_ORIGIN** in backend environment variables
4. **Configure SSL certificates** (Let's Encrypt, Cloudflare SSL, or platform-provided)

### SSL Certificate Setup

```bash
# Using Let's Encrypt with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📈 Performance Optimization

### Backend Optimization

- Enable gzip compression
- Implement caching strategies
- Use CDN for static assets
- Optimize database queries
- Implement rate limiting

### Frontend Optimization

- Enable code splitting
- Implement lazy loading
- Optimize images
- Use service workers for caching
- Minimize bundle size

## 🔄 Backup and Recovery

### Database Backups

```bash
# MongoDB backup
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/jobboard" --out backup/

# Restore
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/jobboard" backup/jobboard/
```

### File Upload Backups

- Use cloud storage with versioning
- Implement automated backup schedules
- Test restore procedures regularly

---

**Built with ❤️ for ALX Software Engineering Program**
