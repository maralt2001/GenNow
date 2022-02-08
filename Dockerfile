
FROM node:17.4-alpine

WORKDIR /app

COPY ./server/package*.json ./

RUN npm install

COPY ./client/build ./client/build
COPY ./server ./

EXPOSE 5000

CMD ["npm", "start"]