const pantryService = require('../services/pantryService');
const userService = require('../services/userService');
const pantryItemService = require('../services/pantryItemService');
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            let usuarios = await userService.buscarTodos();

            for (let i in usuarios) {
                json.result.push({
                    id: usuarios[i].id,
                    nome: usuarios[i].nome,
                    email: usuarios[i].email,
                    fone: usuarios[i].fone,
                    nascimento: usuarios[i].data_nascimento
                });
            }
        } catch (error) {
            json.error = 'Erro ao buscar usuários.';
        }

        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            let codigo = req.params.codigo;
            let usuario = await userService.buscarUm(codigo);

            if (usuario) {
                json.result = usuario;
            } else {
                json.error = 'Usuário não encontrado.';
            }
        } catch (error) {
            json.error = 'Erro ao buscar usuário.';
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            let { nome, email, fone, data_nascimento, senha } = req.body;

            if (nome && email && fone && data_nascimento && senha) {
                let usuarioCodigo = await userService.inserir(nome, email, fone, data_nascimento, senha);
                json.result = {
                    codigo: usuarioCodigo,
                    nome,
                    email,
                    fone,
                    data_nascimento
                };
            } else {
                json.error = 'Campos não enviados.';
            }
        } catch (error) {
            json.error = 'Erro ao inserir usuário.';
        }

        res.json(json);
    },

    login: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            const { email, senha } = req.body;
            const user = await userService.login(email, senha);

            if (user) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                json.result = { token };
            } else {
                json.error = 'Credenciais inválidas.';
            }
        } catch (error) {
            json.error = 'Erro ao realizar login.';
        }

        res.json(json);
    },

    adicionarItemDespensa: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            const { nome, quantidade } = req.body;
            const userId = req.userId; // Extraído do token JWT

            if (nome && quantidade && userId) {
                let itemCodigo = await pantryItemService.adicionarItem(nome, quantidade, userId);
                json.result = { codigo: itemCodigo, nome, quantidade, userId };
            } else {
                json.error = 'Campos não enviados.';
            }
        } catch (error) {
            json.error = 'Erro ao adicionar item à despensa.';
        }

        res.json(json);
    },

    buscarItensDespensa: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            const userId = req.userId; // Extraído do token JWT
            const itens = await pantryItemService.buscarItens(userId);

            json.result = itens;
        } catch (error) {
            json.error = 'Erro ao buscar itens da despensa.';
        }

        res.json(json);
    },

    buscarReceitas: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            const userId = req.userId; // Extraído do token JWT
            const itensDespensa = await pantryItemService.buscarItens(userId);

            const ingredientes = itensDespensa.map(item => item.nome).join(',');
            const response = await axios.get(`https://api.edamam.com/search?q=${ingredientes}&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY`);

            const receitas = response.data.hits.map(hit => ({
                nome: hit.recipe.label,
                ingredientes: hit.recipe.ingredientLines
            }));

            json.result = receitas;
        } catch (error) {
            json.error = 'Erro ao buscar receitas.';
        }

        res.json(json);
    }
};
