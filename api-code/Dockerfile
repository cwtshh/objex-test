FROM node:alpine

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm install

RUN apk add --no-cache --virtual .build-deps \
    build-base \
    linux-headers \
    python3-dev \
    py3-pip

COPY . .

EXPOSE ${API_PORT}

CMD ["npm", "start"]