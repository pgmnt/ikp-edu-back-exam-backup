# Use official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build Next.js app
RUN npm run build

# Expose port 3002
EXPOSE 3002

# Define command to run the application
CMD ["npm", "start"]
