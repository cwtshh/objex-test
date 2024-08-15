# Usando uma imagem base do Node
FROM node:14 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Build da aplicação React
RUN npm run build

# Usa um servidor web para servir os arquivos estáticos
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta para acessar o app
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
