const db = require('../db');

module.exports = {
    buscarTodos: () =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM usuarios', (error, results)=>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm:(codigo) => {
        return new Promise((aceito, rejeitado) =>{

            db.query('SELECT * FROM usuarios WHERE codigo = ?', [codigo], (error, results) =>{
                if(error){ rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                } else{
                    aceito(false);
                }
            });
        });
    },

    inserir:(nome, email, fone, data_nascimento) => {
        return new Promise((aceito, rejeitado) =>{

            db.query('INSERT INTO usuarios (nome, email, fone, data_nascimento) VALUES (?, ?)', 
                [nome, email, fone, data_nascimento], (error, results) =>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo);
                }
            );
        });
    }
};
