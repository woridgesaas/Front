FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ARG NG_APP_API_URL
ENV NG_APP_API_URL=$NG_APP_API_URL

ARG NG_APP_NOTIF_URL
ENV NG_APP_NOTIF_URL=$NG_APP_NOTIF_URL

RUN npm run build -- woridge --configuration production

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/woridge-v1.1.10 /usr/share/nginx/html
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]