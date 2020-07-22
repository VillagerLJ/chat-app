FROM node:14 AS base

RUN apt-get update && apt-get install -y nginx

WORKDIR /chat-app

COPY package*.json /chat-app/

RUN npm ci --only=production

FROM node:12-alpine

WORKDIR /chat-app

COPY --from=base /chat-app .

COPY . .

COPY ./ /chat-app

EXPOSE 4001

CMD sh bin/startup.sh
