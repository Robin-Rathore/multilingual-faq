# Update Dockerfile
FROM node:23-alpine

WORKDIR /app/backend
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "start"]