const pantryService = require('../services/pantryService');

module.exports = {
    buscarTodos: async (req,res)=>{
        let json = {error: '', result:[]};

        let usuarios = await pantryService.buscarTodos();

        for(let i in usuarios){
            json.result.push({
                id: usuarios[i].id,
                nome: usuarios[i].nome,
                email:  usuarios[i].email,
                fone: usuarios[i].fone,
                nascimento: usuarios[i].data_nascimento
            });
        }
        res.json(json);
    },

    buscarUm: async(req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let usuario = await pantryService.buscarUm(codigo);

        if(usuario){
            json.result = usuario;

        }

        res.json(json);
    },

    inserir: async(req, res) => {
        let json = {error: '', result:{}};

        let nome = req.body.nome;
        let email = req.body.email;
        let fone = req.body.fone;
        let data_nascimento = req.body.data_nascimento; 
        

        if(nome && email && fone && data_nascimento){
            let usuarioCodigo = await pantryService.inserir(nome, email, fone, data_nascimento);
            json.result = {
                codigo: usuarioCodigo,
                nome, 
                email, 
                fone, 
                data_nascimento
            };
        } else{
            json.error = 'Campos não enviados';
        }

        res.json(json);
    }
}
