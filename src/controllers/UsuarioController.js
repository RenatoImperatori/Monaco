const database = require('../database/connection');
const bcrypt = require('bcrypt');

class UsuarioController {
    // Insere no banco um novo usuário
    async novoUsuario(request, response) {
        const { nome, email, senha } = request.body;

        console.log(nome, email, senha);

        try {
            const saltRounds = 10; // Define o número de rounds para gerar o salt
            const hashedSenha = await bcrypt.hash(senha, saltRounds);

            // Insere o usuário no banco com a senha criptografada
            database.insert({ nome, email, senha: hashedSenha }).table("usuario")
                .then(data => {
                    console.log(data);
                    response.json({ message: "Usuário criado com sucesso!" });
                })
                .catch(error => {
                    console.log(error);
                    response.status(500).json({ message: "Erro ao criar usuário" });
                });
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Erro ao criptografar a senha" });
        }
    }

    // Verifica no banco os usuários
    logarUsuario(request, response) {
        database.select("*").table("usuario")
            .then(usuarios => {
                console.log(usuarios);
                response.json(usuarios);
            })
            .catch(error => {
                console.log(error);
                response.status(500).json({ message: "Erro ao buscar usuários" });
            });
    }

    // Cadastra ponto de coleta no banco de dados
    cadastrarPonto(request, response){
        const { local_nome, local_email, local_numero, endereco_numero, endereco_cidade, endereco_estado } = request.body;
        console.log(local_nome, local_email, local_numero);
        

        database.insert({ local_nome, local_email, local_numero, endereco_numero, endereco_cidade, endereco_estado }).table("ponto")
        .then (data =>{
            console.log(data);
            response.json({ message: "Ponto cadastrado com sucesso!" });
        })
        .catch(error =>{
            console.log(error);
            response.status(500).json({ message: "Erro ao tentar cadastrar ponto!" });
        })
    }
}

module.exports = new UsuarioController();