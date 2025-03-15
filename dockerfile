# Usa una imagen base con Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de configuración de pnpm y el package.json
COPY package.json pnpm-lock.yaml ./

# Instala pnpm
RUN npm install -g pnpm

# Instala las dependencias del proyecto
RUN pnpm install

# Copia el resto de los archivos del proyecto
COPY . .

# Ejecuta el comando para construir la aplicación
RUN npm run build

# Expone el puerto que usa la aplicación (si es necesario)
EXPOSE 3400

# Comando para ejecutar la aplicación
CMD ["node", "/app/dist/apps/web/index.js"]
