FROM node:22-alpine

WORKDIR /app

# Primero solo package.json: aprovecha la cache de capas de Docker
COPY package.json ./
RUN npm install --omit=dev

# Luego el codigo
COPY . .

EXPOSE 3000
CMD ["node", "index.mjs"]
