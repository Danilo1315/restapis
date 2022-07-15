const express = require('express');
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// Middleware routes
const auth = require('../middleware/auth');

const router = express.Router();

module.exports = function () {

    // Add clientes
    router.post('/clientes', clienteController.nuevoCliente);

    // Get all clients
    router.get('/clientes', auth, clienteController.mostrarClientes);

    // Show client by id
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    // Update client
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Delete cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    // ****************** Productos ******************
    // Add products
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    // Get all products
    router.get('/productos', productosController.mostrarProductos);

    // Show product by id
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Update product by id
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);

    // Delete product by id
    router.delete('/productos/:idProducto' ,productosController.eliminarProducto);


    // ****************** Pedidos ******************
    // Add Orders
    router.post('/pedidos', pedidosController.nuevoPedido);

    // Get all Orders
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // Show order by id
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    // Update order by id
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    // Delete order by id
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);


    // ****************** Usuarios ******************
    router.post('/crear-cuenta', usuariosController.registrarUsuario);

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);



    return router;
}
