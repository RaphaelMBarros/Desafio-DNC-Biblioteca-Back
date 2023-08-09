var express = require('express');
const conectarBancoDados = require('../middleware/conectarDb');
const authUser = require('../middleware/authUser');
const Livros = require('../models/livros');
var router = express.Router();


router.post('/', authUser, conectarBancoDados, async (req, res) => {
  try {
    let {id, titulo, num_paginas, isbn, editora} = req.body

    let usuarioLogado = req.userJwt.id;
    const criarLivro = await Livros.create({id, titulo, num_paginas, isbn, editora, usuarioCriador: usuarioLogado});

    res.status(200).json({criarLivro, mensagem: `Livro ${titulo} cadastrado com sucesso`});

  } catch(error) {
    console.error(error)
    res.json({Erro: "Erro ao cadastrar novo livro"});
  }
  
    
});


router.get('/', authUser, conectarBancoDados, async (req, res) => {
  try {
    let usuarioLogado = req.userJwt.id;
    let listarLivros  = await Livros.find({usuarioCriador: usuarioLogado});

    res.status(200).json(listarLivros);
  } catch(error) {
    console.error(error)
  }
});

router.get('/:id', authUser, conectarBancoDados, async (req, res) => {
  try {
    let usuarioLogado = req.userJwt.id;
    let livroId = req.params.id;

    let listarUmLivro = await Livros.findOne({id: livroId, usuarioCriador: usuarioLogado});
    res.status(200).json(listarUmLivro)
  } catch(error) {
    console.error(error)
  }
});


router.put('/:id', authUser, conectarBancoDados, async (req, res) => {
  try {
    let livroId = req.params.id;
    let usuarioLogado = req.userJwt.id;

    let {titulo, num_paginas, isbn, editora} = req.body;

    let atualizaLivro = await Livros.updateOne({id: livroId, usuarioCriador: usuarioLogado}, {titulo, num_paginas, isbn, editora});
    if(atualizaLivro.modifiedCount > 0){
      const livroAtualizado =await Livros.findOne({ id: livroId})
      res.status(200).json({livro: livroAtualizado, mensagem: "Livro atualizado com sucesso."});
    }    
    
    
  } catch(error) {
    console.error(error)
  }
});


router.delete('/:id', authUser, conectarBancoDados, async (req, res) => {
  try {
    let usuarioLogado = req.userJwt.id;
    let livroId = req.params.id;

    let removerLivro = await Livros.deleteOne({id: livroId, usuarioCriador: usuarioLogado});
    res.status(200).json({livro: removerLivro, mensagem: "Livro removido com sucesso."})
  } catch(err) {
    console.error(err);
  }
  
  
});


module.exports = router;
