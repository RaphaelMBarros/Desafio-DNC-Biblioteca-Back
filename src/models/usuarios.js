const mongoose = require('mongoose');
const validator = require('validator');

const usuariosEsquema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: "Este campo e' obrigatorio."
        },
        email: {
            type: String,
            required: "Este campo e' obrigatorio.",
            unique: true,
            required: "e' obrigatorio!",
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
                message: 'invalido!'
            }
        },
        senha: {
            type: String,
            required: "e' obrigatorio",
            select: false
        }
    },
    {
        timestamps: true
    }

);

const Usuarios = mongoose.model('Usuarios', usuariosEsquema);
module.exports = Usuarios;