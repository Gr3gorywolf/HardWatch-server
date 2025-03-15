FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN npm run build
EXPOSE 3400
WORKDIR /app/dist/apps/web
CMD ["node", "main.js"]
