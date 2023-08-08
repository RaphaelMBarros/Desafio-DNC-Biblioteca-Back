const mongoose = require('mongoose');

const livroEsquema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    num_paginas: {
        type: Number,
        required: true
    },
    isbn : {
        type: String,
        required: true
    },
    editora: {
        type: String,
        required: true
    }
    
})

const Livros = mongoose.model('Livros', livroEsquema)
module.exports = Livros;
