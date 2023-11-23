// Importando o módulo express para criação de rotas
const express = require('express');
// Criando um objeto router para definir rotas
const router = express.Router();

// Importando os controladores relacionados a usuários e itens de despensa
const pantryController = require('./controllers/pantryController');
const pantryItemController = require('./controllers/pantryItemController');

// Rotas de Usuários
router.get('/usuarios', pantryController.buscarTodos);       // Rota para buscar todos os usuários
router.get('/usuario/:codigo', pantryController.buscarUm);   // Rota para buscar um usuário por código
router.post('/usuario', pantryController.inserir);           // Rota para inserir um novo usuário

// Rotas de Itens de Despensa
router.get('/itens-despensa/:userId', pantryItemController.buscarTodos);         // Rota para buscar todos os itens de despensa de um usuário
router.get('/item-despensa/:itemId', pantryItemController.buscarUm);              // Rota para buscar um item de despensa por ID
router.post('/item-despensa', pantryItemController.inserir);                      // Rota para inserir um novo item de despensa
router.put('/item-despensa/:itemId', pantryItemController.atualizar);             // Rota para atualizar um item de despensa
router.delete('/item-despensa/:itemId', pantryItemController.deletar);            // Rota para excluir um item de despensa

// Exportando o objeto router para ser utilizado pelo servidor principal
module.exports = router;
