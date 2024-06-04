FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
# Instala dependências necessárias para adicionar repositórios
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    linux-headers \
    python3-dev \
    py3-pip

# Instala Python e pip
RUN apk add --no-cache python3 py3-pip

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]
