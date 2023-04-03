FROM node:14.20.1-alpine
WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .
CMD ["node", "dist/index.js"]
