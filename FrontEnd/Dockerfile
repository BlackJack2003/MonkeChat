# Use an official Python runtime as a parent image
FROM node:latest

WORKDIR /app/

EXPOSE 3000

# Run Gunicorn using the wait-for-it script to wait for PostgreSQL and reset db if needed
CMD ["node","start"]