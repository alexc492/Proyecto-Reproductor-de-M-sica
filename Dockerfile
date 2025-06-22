# Usa una imagen base de Node.js con una versión LTS
FROM node:20-alpine as builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./

# Instala las dependencias
RUN npm install --omit=dev # Evita instalar dependencias de desarrollo en la imagen final

# Copia el resto de la aplicación (fuente, etc.)
COPY . .


RUN npm run build

# Etapa para la imagen final (más pequeña)
FROM node:20-alpine

WORKDIR /app

# Copia solo lo necesario desde la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expone el puerto en el que tu aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/server.js"]