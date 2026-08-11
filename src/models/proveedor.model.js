const mongoose = require('../config/connectiondb');

/**
 * Modelo de Proveedor.
 *
 * Representa a las empresas o personas que suministran productos
 * mediante ordenes de compra.
 */

const proveedorSchema = new mongoose.Schema({

    // Razon social o nombre del proveedor.
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [200, 'El nombre no puede superar los 200 caracteres']
    },

    // Telefono de contacto del proveedor.
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        maxlength: [20, 'El telefono no puede superar los 20 caracteres']
    },

    // Correo unico de contacto del proveedor.
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: [true, 'El correo debe ser unico'],
        trim: true,
        lowercase: true
    }

}, 
);


module.exports = mongoose.model('Proveedor', proveedorSchema);
