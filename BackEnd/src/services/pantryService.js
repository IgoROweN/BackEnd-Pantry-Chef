// Importando o módulo de conexão com o banco de dados
const db = require('../db');

// Exportando métodos relacionados à manipulação de usuários no banco de dados
module.exports = {
    // Método para buscar todos os usuários
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para buscar todos os usuários
            db.query('SELECT * FROM usuarios', (error, results) => {
                if (error) {
                    // Rejeitando a Promise em caso de erro
                    rejeitado(error);
                    return;
                }
                // Aceitando a Promise e retornando os resultados obtidos
                aceito(results);
            });
        });
    },

    // Método para buscar um usuário por código
    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para buscar um usuário pelo código
            db.query('SELECT * FROM usuarios WHERE codigo = ?', [codigo], (error, results) => {
                if (error) {
                    // Rejeitando a Promise em caso de erro
                    rejeitado(error);
                    return;
                }
                // Verificando se um usuário foi encontrado e aceitando a Promise
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(null); // Retornando null se usuário não for encontrado
                }
            });
        });
    },

    // Método para inserir um novo usuário no banco de dados
    inserir: (nome, email, fone, data_nascimento, senha) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para inserir um usuário
            db.query('INSERT INTO usuarios (nome, email, fone, data_nascimento, senha) VALUES (?, ?, ?, ?, ?)',
                [nome, email, fone, data_nascimento, senha], (error, results) => {
                    if (error) {
                        // Rejeitando a Promise em caso de erro
                        rejeitado(error);
                        return;
                    }
                    // Aceitando a Promise e retornando o ID do usuário inserido
                    aceito(results.insertId);
                }
            );
        });
    },

    // Método para realizar o login de um usuário
    login: (email, senha) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para buscar um usuário por email e senha
            db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (error, results) => {
                if (error) {
                    // Rejeitando a Promise em caso de erro
                    rejeitado(error);
                    return;
                }
                // Verificando se credenciais são válidas e aceitando a Promise
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(null); // Retornando null se credenciais não forem válidas
                }
            });
        });
    }
};
