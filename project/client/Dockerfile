FROM node:14

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "app"]