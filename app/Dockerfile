FROM node:lts-alpine3.11

COPY entrypoint.sh /entrypoint.sh
COPY package*.json ./
COPY app.js /app.js

RUN chmod 755 /entrypoint.sh

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]