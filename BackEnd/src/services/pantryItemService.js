// Importando o módulo de conexão com o banco de dados
const db = require('../db');

// Exportando métodos relacionados à manipulação de itens na despensa no banco de dados
module.exports = {
    // Método para buscar todos os itens da despensa de um usuário
    buscarTodos: (userId) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para buscar todos os itens da despensa do usuário
            db.query('SELECT * FROM pantry_items WHERE user_id = ?', [userId], (error, results) => {
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

    // Método para buscar um item da despensa por ID
    buscarUm: (itemId) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para buscar um item da despensa por ID
            db.query('SELECT * FROM pantry_items WHERE id = ?', [itemId], (error, results) => {
                if (error) {
                    // Rejeitando a Promise em caso de erro
                    rejeitado(error);
                    return;
                }
                // Verificando se um item foi encontrado e aceitando a Promise
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(null); // Retorna null se o item não for encontrado
                }
            });
        });
    },

    // Método para inserir um novo item na despensa
    inserir: (userId, nome, quantidade, unidade) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para inserir um item na despensa
            db.query('INSERT INTO pantry_items (user_id, nome, quantidade, unidade) VALUES (?, ?, ?, ?)',
                [userId, nome, quantidade, unidade], (error, results) => {
                    if (error) {
                        // Rejeitando a Promise em caso de erro
                        rejeitado(error);
                        return;
                    }
                    // Aceitando a Promise e retornando o ID do item inserido
                    aceito(results.insertId);
                }
            );
        });
    },

    // Método para atualizar um item na despensa
    atualizar: (itemId, nome, quantidade, unidade) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para atualizar um item na despensa por ID
            db.query('UPDATE pantry_items SET nome = ?, quantidade = ?, unidade = ? WHERE id = ?',
                [nome, quantidade, unidade, itemId], (error, results) => {
                    if (error) {
                        // Rejeitando a Promise em caso de erro
                        rejeitado(error);
                        return;
                    }
                    // Aceitando a Promise e retornando true se a atualização for bem-sucedida
                    aceito(results.affectedRows > 0);
                }
            );
        });
    },

    // Método para deletar um item da despensa por ID
    deletar: (itemId) => {
        return new Promise((aceito, rejeitado) => {
            // Realizando a consulta SQL para deletar um item da despensa por ID
            db.query('DELETE FROM pantry_items WHERE id = ?', [itemId], (error, results) => {
                if (error) {
                    // Rejeitando a Promise em caso de erro
                    rejeitado(error);
                    return;
                }
                // Aceitando a Promise e retornando true se a exclusão for bem-sucedida
                aceito(results.affectedRows > 0);
            });
        });
    }
};
