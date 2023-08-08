const express = require('express');
const conectarBancoDados = require('../middleware/conectarDb');
const Usuarios = require('../models/usuarios');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/criar', conectarBancoDados, async (req, res)=> {
    try {
        let {nome, email, senha} = req.body;

        let numHash = 10;
        let senhaBcrypt = await bcrypt.hash(senha, numHash);
        let criarUsuario = await Usuarios.create({nome, email, senha: senhaBcrypt});
        res.status(200).json({
            usuarioCriado: criarUsuario,
            mensagem: "Usuario cadastrado com sucesso."
        })
    } catch(err) {
        if (String(err).includes("email_1 dup key")){
            console.error("Error: Ja' existe uma conta com este e-mail.");
          }
      
        console.error(err)
    }
});

router.post('/logar', conectarBancoDados, async (req, res)=> {
    try {
        let {email, senha} = req.body;
        let respostaBd = await Usuarios.findOne({ email }).select('+senha');
        if(respostaBd){
            let senhaCorreta = await bcrypt.compare(senha, respostaBd.senha);
            if(senhaCorreta){
                
                let token = jwt.sign({id: respostaBd._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

                res.header('x-auth-token', token)
                res.status(200).json({
                    
                    status: "OK",
                    statusMensagem: "Usuario autenticado com sucesso.",
                    resposta: { "x-auth-token": token }
                })
            } else {  
                throw new Error("E-mail ou senha incorreto");
            }
        }else {  
            throw new Error("E-mail ou senha incorreto");    
        }
    } catch(err) {
        console.error(err)
    }    
    
});

module.exports = router;