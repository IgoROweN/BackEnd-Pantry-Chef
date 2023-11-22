const express = require('express');
const router = express.Router();

const pantryController = require('./controllers/pantryController');

router.get('/usuarios', pantryController.buscarTodos);
router.get('/usuario/:codigo', pantryController.buscarUm);
router.post('/usuario', pantryController.inserir);

module.exports = router; 