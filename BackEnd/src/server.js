// Importando o módulo dotenv para carregar variáveis de ambiente de um arquivo específico
require('dotenv').config({ path: 'variables.env' });

// Importando os módulos express, cors e body-parser para configuração do servidor
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importando as rotas definidas no arquivo routes.js
const routes = require('./routes');

// Criando uma instância do servidor Express
const server = express();

// Adicionando middleware para permitir solicitações de diferentes origens (CORS)
server.use(cors());

// Adicionando middleware para analisar dados da solicitação codificados em URL
server.use(bodyParser.urlencoded({ extended: false }));
// Adicionando middleware para analisar dados da solicitação no formato JSON
server.use(bodyParser.json());

// Definindo o caminho base para as rotas como '/api'
server.use('/api', routes);

// Iniciando o servidor e ouvindo na porta especificada em variável de ambiente
server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
