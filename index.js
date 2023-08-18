const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const corsOptions = {
    origin: 'https://biblioteca-front.netlify.app/', // Altere para o seu domínio de desenvolvimento
    optionsSuccessStatus: 200 // Algumas versões do CORS exigem isso
  };
  

  
const routes = require('./src/routes');

const app = express();
require('dotenv').config();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

if (process.env.NODE_ENV !== 'teste') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
