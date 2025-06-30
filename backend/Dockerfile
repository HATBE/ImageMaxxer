# Step 1: Use an official Node.js image as the base image
FROM node:21-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the entire application code to the working directory
COPY . .

# Step 4: Install app dependencies
RUN npm install

# Step 6: Build the TypeScript code
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 3000

# Step 8: Define the command to run your application
CMD ["npm", "start"]

# Additional Step: Specify a volume for /data (this is typically handled outside of the Dockerfile)
VOLUME ["/usr/src/app/data"]