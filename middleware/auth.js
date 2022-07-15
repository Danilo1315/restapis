const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Autorizacion por el header
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    // Obtener token y verificarlo
    const token = authHeader.split(' ')[1];
    console.log(authHeader);
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, '84d307b6');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    console.log("revisar: ")
    console.log(revisarToken);
    // Si es token valido
    if(!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();
}