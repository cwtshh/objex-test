# ObjeX - Testes

Repositório de estudos e testes para o trabalho de Requisitos de Software.
OBS: O repositório tem alguns branches, a mais atual é a branch front-end, nela há demonstrações das funções básicas da aplicação, sendo elas:

- CRUD de Alunos
- CRUD de Grupos
- Envio de imagens
- Seção de funcionalidades relacionadas a código
  - "Compilador" de códigos em python.
  - Existem outros mas não estão funcionando ainda no frontend, apenas por acesso direto pela API.

## Como rodar

### para rodar o frontend:

Na pasta /frontend execute o comando: 
`npm install`

Após a instalação dos pacotes execute:
`npm run dev`

### Para rodar o backend  

- Docker é necessário para conseguir rodar.

Na pasta /backend execute o comando:

`docker compose up`

Com isso o container irá subir e vc estará pronto para usar a API e banco de dados.

OBS: se quiser mudar o nome do container execute:

`docker-compose -p <novo_nome> up -d` 
