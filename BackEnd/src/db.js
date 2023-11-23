// Importando o módulo MySQL para conexão com o banco de dados
const mysql = require('mysql');

// Criando uma conexão com o banco de dados usando as variáveis de ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST,         // Endereço do servidor do banco de dados
    user: process.env.DB_USER,         // Nome do usuário do banco de dados
    password: process.env.DB_PASS,     // Senha do usuário do banco de dados
    database: process.env.DB_NAME,     // Nome do banco de dados a ser utilizado
});

// Estabelecendo a conexão com o banco de dados
connection.connect((error) => {
    // Verificando se ocorreu algum erro durante a conexão
    if (error) {
        // Lançando uma exceção em caso de erro, interrompendo a execução do programa
        throw error;
    }
    // Exibindo uma mensagem no console indicando que a conexão foi bem-sucedida
    console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);
});

// Exportando a conexão para que possa ser utilizada em outros módulos
module.exports = connection;
