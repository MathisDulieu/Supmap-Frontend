FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

RUN echo "window.env = { GOOGLE_API_KEY: '' };" > ./public/env-config.js

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN echo "window.env = { API_BASE_URL: '${API_BASE_URL}', GOOGLE_API_KEY: '${GOOGLE_API_KEY}' };" > /usr/share/nginx/html/env-config.js

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]