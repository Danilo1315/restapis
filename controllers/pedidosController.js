const Pedidos = require('../models/Pedidos');

// Add new order
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({msg: 'Se agrego un nuevo pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// Get alls orders
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Show order by id
exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        if (!pedido) {
            res.json({msg: 'El pedido no existe'});
            next();
        } else {
            res.json(pedido);
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

// Update order by id
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, {
            new: true
        })
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido)
    } catch (error) {
        console.log(error);
        next();
    }
}

// Delete order by id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id: req.params.idPedido});
        res.json({msg: 'El pedido se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}