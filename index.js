const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Cors permite que un cliente se conecte a otro servidor para el intercambio de recuersos
const cors = require('cors');

// Conectar a Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_, {
    useNewUrlParser: true
});


// Crear servidor
const app = express();

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());
// Definir un dominio para cors
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        // Validar si la peticion viene de un servidor que esta en whitelist
        const existe = whitelist.some( dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}


// Rutas de la App
app.use('/', routes());

// Puerto
app.listen(port, host, () => {
    console.log(`Server listening on port ${port}`);
});