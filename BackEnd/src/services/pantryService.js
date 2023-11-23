const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios', (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios WHERE codigo = ?', [codigo], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(null); // Retornando null se usuário não for encontrado
                }
            });
        });
    },

    inserir: (nome, email, fone, data_nascimento, senha) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO usuarios (nome, email, fone, data_nascimento, senha) VALUES (?, ?, ?, ?, ?)',
                [nome, email, fone, data_nascimento, senha], (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results.insertId); // Retornando o ID do usuário inserido
                }
            );
        });
    },

    login: (email, senha) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(null); // Retornando null se credenciais não forem válidas
                }
            });
        });
    }
};
