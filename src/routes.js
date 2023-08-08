function routes(app) {
    app.use('/livros', require('./routes/livros'));
    app.use('/usuarios', require('./routes/usuarios'))
    return;
}

module.exports = routes;