const path = require('path');
const mongoose = require('mongoose');

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