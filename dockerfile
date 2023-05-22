# Frontend Dockerfile

# Use the official Node.js base image
FROM node:latest as frontend

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend project files
COPY frontend/ ./

# Build the frontend project
RUN npm run build


# Backend Dockerfile

# Use the official Python base image
FROM python:latest as backend

# Set the working directory
WORKDIR /app/backend

# Copy requirements.txt
COPY backend/REQUIREMENTS.txt ./

# Install backend dependencies
RUN pip install -r requirements.txt

# Copy the backend project files
COPY backend/ ./

# Expose the port for the Django development server
EXPOSE 8000

# Start the Django development server
CMD python manage.py runserver 0.0.0.0:8000
