const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado correctamente');
    })
    .catch((error) => {
        console.log('Error al conectar MongoDB:', error);
    });

module.exports = mongoose;