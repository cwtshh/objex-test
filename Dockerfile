# Etapa 1: Build do Frontend
FROM node:14 AS build-frontend

WORKDIR /app/frontend

# Copia os arquivos de dependência e instala as dependências
COPY frontend/package*.json ./
RUN npm install

# Copia o restante do código do frontend e executa o build
COPY frontend/ .
RUN npm run build

# Etapa 2: Configuração do Backend
FROM node:alpine AS build-api

WORKDIR /app/api

# Copia os arquivos de dependência e instala as dependências
COPY api/package*.json ./
RUN npm install

# Copia o restante do código do backend
COPY api/ .

# Copia os arquivos do build do frontend para a pasta public do backend
COPY --from=build-frontend /app/frontend/build ./public

# Expõe a porta do backend
EXPOSE 3000

# Define as variáveis de ambiente (essas variáveis podem ser substituídas pelas do EasyPanel)
ENV NODE_ENV production
# ENV REACT_APP_API_URL https://api.meusite.com

# Comando para iniciar o backend
CMD ["npm", "start"]