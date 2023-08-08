var express = require('express');
const conectarBancoDados = require('../middleware/conectarDb');
const Livros = require('../models/livros');
var router = express.Router();


router.post('/', conectarBancoDados, async (req, res) => {
  try {
    let {id, titulo, num_paginas, isbn, editora} = req.body

    const criarLivro = await Livros.create({id, titulo, num_paginas, isbn, editora});

    res.status(200).json({data: criarLivro});

  } catch(error) {
    console.error(error)
    res.json({Erro: "Erro ao cadastrar novo livro"});
  }
  
    
});


router.get('/', conectarBancoDados, async (req, res) => {
  try {
    let listarLivros  = await Livros.find();

    res.status(200).json(listarLivros);
  } catch(error) {
    console.error(error)
  }
});

router.get('/:id', conectarBancoDados, async (req, res) => {
  try {
    let livroId = req.params.id;

    let listarUmLivro = await Livros.findOne({id: livroId});
    res.status(200).json(listarUmLivro)
  } catch(error) {
    console.error(error)
  }
});


router.put('/:id', conectarBancoDados, async (req, res) => {
  try {
    let livroId = req.params.id;

    let {titulo, num_paginas, isbn, editora} = req.body;

    let atualizaLivro = await Livros.updateOne({id: livroId}, {titulo, num_paginas, isbn, editora});
    if(atualizaLivro.modifiedCount > 0){
      const livroAtualizado =await Livros.findOne({ id: livroId})
      res.status(200).json({livro: livroAtualizado, mensagem: "Livro atualizado com sucesso."});
    }    
    
    
  } catch(error) {
    console.error(error)
  }
});


router.delete('/:id', conectarBancoDados, async (req, res) => {
  try {
    let livroId = req.params.id;

    let removerLivro = await Livros.deleteOne({id: livroId});
    res.status(200).json({livro: removerLivro, mensagem: "Livro removido com sucesso."})
  } catch(err) {
    console.error(err);
  }
  
  
});


module.exports = router;
