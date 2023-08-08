const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    const token = req.headers('x-auth-token');
    
    if(!token) {
        throw new Error('Token nao fornecido') 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userJwt = decoded; 

        next();
    } catch(err) {
        conselo.error(err)
        throw new Error('Token invalido')
    }
};

module.exports = authUser;