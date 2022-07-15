const Clientes = require('../models/Clientes');

// Add new client
exports.nuevoCliente = async (req, res, next) => {
    console.log(req.body);
    const cliente = new Clientes(req.body);

    try {
        // Almacenar registro
        await cliente.save();
        res.json({msg: 'Se agrego un nuevo cliente'});
    } catch (e) {
        // Si hay error
        console.log(e);
        next();
    }
}

// Get all clients
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Show clients by id
exports.mostrarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        
        if(!cliente){
            res.json({msg: 'Ese cliente no existe'});
            next();
        }else {
            res.json(cliente);   
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

// Update client by id
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente },
            req.body, {
                new: true
            });
            res.json(cliente);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Delete client by id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({ _id: req.params.idCliente});
        res.json({msg: 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}