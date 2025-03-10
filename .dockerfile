# Usar la imagen oficial de Node.js
FROM node:16

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de configuración
COPY config.json /app/config.json

# Copiar el código de la aplicación
COPY . /app

# Instalar dependencias
RUN npm install

# Exponer el puerto en el que corre la app
EXPOSE 3400

# Comando para ejecutar el servidor de Express
CMD ["node", "index.js"]
