FROM node

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

RUN npm run build

# Verifique se o build foi gerado corretamente
RUN ls -la /app/frontend/build


FROM node:alpine

WORKDIR /app/api

COPY api/package*.json ./

COPY api/ .

RUN npm install

COPY --from=build-frontend /app/frontend/build /app/api/public

EXPOSE 4000

ENV NODE_ENV production

CMD ["npm", "start"]

