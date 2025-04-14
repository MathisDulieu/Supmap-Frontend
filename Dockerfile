FROM node:18-alpine AS build

WORKDIR /app

# Copier et installer les dépendances
COPY package.json package-lock.json* ./
RUN npm ci

# Copier le reste du code source
COPY . .

# Build de l'application
RUN npm run build

# Étape de production
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Créer un endpoint de health check pour Railway
RUN echo "healthy" > /usr/share/nginx/html/health.html

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]