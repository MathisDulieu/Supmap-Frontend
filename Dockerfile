FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

RUN echo "location /health { return 200 'healthy'; }" > /etc/nginx/conf.d/health.conf

CMD ["nginx", "-g", "daemon off;"]