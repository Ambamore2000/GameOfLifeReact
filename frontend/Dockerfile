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

# Production build
FROM base as build
RUN npm run build

FROM nginx:alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
