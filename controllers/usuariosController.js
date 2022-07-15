const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
    // Leer datos de usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({msg: 'Usuario creado correctamente!'});
    } catch (error) {
        console.log(error);
        res.json({msg: 'Hubo un error'})
    }
}


exports.autenticarUsuario = async (req, res, next) => {
    // Validar usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
        // Si el user no existe
        await res.status(401).json({msg: 'Ese usuario no existe'});
    } else {
        // Si el pass es correcto
        if (!bcrypt.compareSync(password, usuario.password)) {
            // Si el pass es incorrecto
            await res.status(401).json({msg: 'Password Incorrecto'});
            next();
        } else {
            // Password correcto, crear token
            const token = jwt.sign({
                email : usuario.email,
                nombre : usuario.nombre,
                id : usuario._id
            },
            '84d307b6',
            {
                expiresIn : '1h'
            });

            res.json({token: token});
        }
    }

}