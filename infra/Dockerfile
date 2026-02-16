FROM node:20-alpine AS build
WORKDIR /app

#cache in docker
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- woridge --configuration production


FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/woridge-v1.1.10 /usr/share/nginx/html
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]