const mongoose = require('mongoose');

async function conectarBancoDados(req = null, res = null, next = null) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Conectado ao banco de dados!');
        try { next(); } catch { };
        return mongoose;
    }   catch (error) {
        console.error(error);       
        return error;
    }
}

module.exports = conectarBancoDados;