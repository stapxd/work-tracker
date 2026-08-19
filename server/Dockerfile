FROM node:24-alpine
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "./src/index.ts"]
EXPOSE 3000
