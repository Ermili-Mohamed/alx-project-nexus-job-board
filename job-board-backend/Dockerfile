# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads/company-logos uploads/portfolios uploads/resumes

# Expose port (Render will use PORT environment variable)
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
