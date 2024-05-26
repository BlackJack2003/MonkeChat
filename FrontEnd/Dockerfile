FROM node:latest
# Set the working directory
WORKDIR /app
# Copy the built files from the previous stage
# COPY --from=build /app .

# Install only production dependencies
# RUN npm install --only=production

# Expose the application port (change 3000 to your application's port if different)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
