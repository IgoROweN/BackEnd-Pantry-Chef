const express = require('express');
const router = express.Router();

const pantryController = require('./controllers/pantryController');
const pantryItemController = require('./controllers/pantryItemController');

// Rotas de Usuários
router.get('/usuarios', pantryController.buscarTodos);
router.get('/usuario/:codigo', pantryController.buscarUm);
router.post('/usuario', pantryController.inserir);

// Rotas de Itens de Despensa
router.get('/itens-despensa/:userId', pantryItemController.buscarTodos);
router.get('/item-despensa/:itemId', pantryItemController.buscarUm);
router.post('/item-despensa', pantryItemController.inserir);
router.put('/item-despensa/:itemId', pantryItemController.atualizar);
router.delete('/item-despensa/:itemId', pantryItemController.deletar);

module.exports = router;
