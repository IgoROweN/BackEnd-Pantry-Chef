// Importando os serviços necessários
const pantryService = require('../services/pantryService');
const userService = require('../services/userService');
const pantryItemService = require('../services/pantryItemService');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Exportando o módulo contendo os métodos do controlador
module.exports = {
    // Método para buscar todos os usuários
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            // Buscando todos os usuários no serviço
            let usuarios = await userService.buscarTodos();

            // Transformando o resultado em um formato desejado
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

        // Respondendo com o resultado
        res.json(json);
    },

    // Método para buscar um usuário por código
    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            // Extraindo o código do parâmetro da requisição
            let codigo = req.params.codigo;
            // Buscando um usuário no serviço
            let usuario = await userService.buscarUm(codigo);

            // Verificando se o usuário foi encontrado
            if (usuario) {
                json.result = usuario;
            } else {
                json.error = 'Usuário não encontrado.';
            }
        } catch (error) {
            json.error = 'Erro ao buscar usuário.';
        }

        // Respondendo com o resultado
        res.json(json);
    },

    // Método para inserir um novo usuário
    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            // Extraindo dados do corpo da requisição
            let { nome, email, fone, data_nascimento, senha } = req.body;

            // Verificando se os campos necessários foram enviados
            if (nome && email && fone && data_nascimento && senha) {
                // Inserindo o usuário no serviço
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

        // Respondendo com o resultado
        res.json(json);
    },

    // Método para realizar o login
    login: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            // Extraindo dados do corpo da requisição
            const { email, senha } = req.body;
            // Realizando o login no serviço
            const user = await userService.login(email, senha);

            // Verificando se as credenciais são válidas
            if (user) {
                // Gerando um token JWT
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                json.result = { token };
            } else {
                json.error = 'Credenciais inválidas.';
            }
        } catch (error) {
            json.error = 'Erro ao realizar login.';
        }

        // Respondendo com o resultado
        res.json(json);
    },

    // Método para adicionar item à despensa
    adicionarItemDespensa: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            // Extraindo dados do corpo da requisição
            const { nome, quantidade } = req.body;
            // Extraindo o ID do usuário do token JWT
            const userId = req.userId;

            // Verificando se os campos necessários foram enviados
            if (nome && quantidade && userId) {
                // Adicionando o item à despensa no serviço
                let itemCodigo = await pantryItemService.adicionarItem(nome, quantidade, userId);
                json.result = { codigo: itemCodigo, nome, quantidade, userId };
            } else {
                json.error = 'Campos não enviados.';
            }
        } catch (error) {
            json.error = 'Erro ao adicionar item à despensa.';
        }

        // Respondendo com o resultado
        res.json(json);
    },

    // Método para buscar itens da despensa
    buscarItensDespensa: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            // Extraindo o ID do usuário do token JWT
            const userId = req.userId;
            // Buscando itens da despensa no serviço
            const itens = await pantryItemService.buscarItens(userId);

            json.result = itens;
        } catch (error) {
            json.error = 'Erro ao buscar itens da despensa.';
        }

        // Respondendo com o resultado
        res.json(json);
    },

    // Método para buscar receitas com base nos itens da despensa
    buscarReceitas: async (req, res) => {
        let json = { error: '', result: [] };

        try {
            // Extraindo o ID do usuário do token JWT
            const userId = req.userId;
            // Buscando itens da despensa no serviço
            const itensDespensa = await pantryItemService.buscarItens(userId);

            // Obtendo os nomes dos itens da despensa
            const ingredientes = itensDespensa.map(item => item.nome).join(',');
            // Fazendo uma requisição à API de receitas
            const response = await axios.get(`https://api.edamam.com/search?q=${ingredientes}&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY`);

            // Formatando as receitas obtidas
            const receitas = response.data.hits.map(hit => ({
                nome: hit.recipe.label,
                ingredientes: hit.recipe.ingredientLines
            }));

            json.result = receitas;
        } catch (error) {
            json.error = 'Erro ao buscar receitas.';
        }

        // Respondendo com o resultado
        res.json(json);
    }
};
