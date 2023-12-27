# Base image
FROM node:20 as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Development build
FROM base as development
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Production build - Builds the static files for production
FROM base as production-build
RUN npm run build

# Production image with Nginx to serve the static files
FROM nginx:alpine as production
COPY --from=production-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
