const path = require('path');
const dns = require('dns');
const mongoose = require('mongoose');

// La URI "mongodb+srv://" necesita una consulta DNS de tipo SRV. En algunas
// redes (por ejemplo cuando el router solo entrega un DNS IPv6 "fe80::1")
// Node en Windows no encuentra un DNS valido, pregunta a 127.0.0.1 y falla con
// "querySrv ECONNREFUSED". Usar DNS publicos evita ese problema.
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Carga el archivo .env desde la raíz del proyecto
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://intshot1_db_user:FY9vATap2pqwxEZN@cluster0.iky9f1s.mongodb.net/intshot1_db';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Atlas conectado correctamente');
    })
    .catch((error) => {
        console.log('Error al conectar MongoDB:', error);
    });

module.exports = mongoose;