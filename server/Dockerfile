# Server Dockerfile (with nodemon for dev mode)
FROM node:20-alpine

WORKDIR /app

# Copy package files and install all deps (including dev)
COPY package*.json ./
RUN npm install -g nodemon && npm install

# Copy the rest of the backend
COPY . .

EXPOSE 5000

# Run with nodemon for live reload
CMD ["npm", "start"]
