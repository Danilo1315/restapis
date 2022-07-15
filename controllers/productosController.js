const Productos = require('../models/Productos');

// Upload image
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }else {
            cb(new Error('Formato No válido'));
        }
    }
}
// Pasar configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// Up file
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({msg: error});
        }
        return next();
    });
}



// Add new product
exports.nuevoProducto = async (req, res, next) => {
    console.log(req.body);
    const producto = new Productos(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({msg: 'Se agrego un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Get all products
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Show product by id
exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto);

        if(!producto) {
            res.json({msg: 'El producto no existe'});
            next();
        }else {
            res.json(producto)
        }
    } catch (error) {
        console.log(error);
    }
}

// Update product by id
exports.actualizarProducto = async (req, res, next) => {
    try {
        // Contruir nuevo producto
        let nuevoProducto = req.body;

        // Verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        const producto = await Productos.findOneAndUpdate({_id: req.params.idProducto},
            nuevoProducto, {
                new: true
            });

            res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Delete product by id
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findOneAndDelete({_id: req.params.idProducto});
        res.json({msg: 'El producto se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}