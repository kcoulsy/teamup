FROM node:alpine AS builder

WORKDIR /app
COPY package.json ./
RUN npm install turbo
COPY . .

RUN cd ./apps/client && npm install
RUN cd ./apps/server && npm install

ENV PORT=8080

EXPOSE 8080

RUN npm run build

CMD [ "npm", "start" ]