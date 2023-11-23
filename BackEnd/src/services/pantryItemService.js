const db = require('../db');

module.exports = {
    buscarTodos: (userId) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pantry_items WHERE user_id = ?', [userId], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    buscarUm: (itemId) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM pantry_items WHERE id = ?', [itemId], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(null); // Retorna null se o item não for encontrado
                }
            });
        });
    },

    inserir: (userId, nome, quantidade, unidade) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO pantry_items (user_id, nome, quantidade, unidade) VALUES (?, ?, ?, ?)',
                [userId, nome, quantidade, unidade], (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results.insertId); // Retorna o ID do item inserido
                }
            );
        });
    },

    atualizar: (itemId, nome, quantidade, unidade) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE pantry_items SET nome = ?, quantidade = ?, unidade = ? WHERE id = ?',
                [nome, quantidade, unidade, itemId], (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results.affectedRows > 0); // Retorna true se a atualização for bem-sucedida
                }
            );
        });
    },

    deletar: (itemId) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM pantry_items WHERE id = ?', [itemId], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results.affectedRows > 0); // Retorna true se a exclusão for bem-sucedida
            });
        });
    }
};
