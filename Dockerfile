# docker build -t dblasby2/ogcapi-records-web .
# docker push dblasby2/ogcapi-records-web:latest
#
# docker run -p 80:80 dblasby2/ogcapi-records-web:latest
#
#
# docker buildx build    --platform linux/amd64,linux/arm64/v8   -t dblasby2/ogcapi-records-web .
# docker push dblasby2/ogcapi-records-web:latest



# Stage 1: Build Angular 18 App
FROM node:20 AS builder

# Install Angular CLI globally
RUN npm install --loglevel verbose -g @angular/cli@18

WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app for production
RUN ng build --configuration=production



# Stage 2: Combine Angular and Node.js with NGINX
FROM nginx:alpine

# Copy the Angular build from the builder stage to NGINX
COPY --from=builder /app/dist/gn-ogcapi-angular /usr/share/nginx/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/00-update-gn-url.sh /docker-entrypoint.d/


# Expose the necessary ports
EXPOSE 80
