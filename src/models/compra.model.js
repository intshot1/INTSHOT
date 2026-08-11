const mongoose = require('../config/connectiondb');

/**
 * Modelo de Compra.
 *
 * Representa una orden de compra realizada a un proveedor para
 * reabastecer el inventario de productos.
 */

const compraSchema = new mongoose.Schema({

    // Proveedor al que se le realiza la compra (referencia al modelo Proveedor).
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: [true, 'El proveedor es obligatorio']
    },

    // Fecha de creacion de la compra.
    fecha: {
        type: Date,
        default: Date.now
    },

    // Estado de recepcion de la compra.
    estado: {
        type: String,
        enum: ['Pendiente', 'Recibida', 'Recibida parcialmente'],
        default: 'Pendiente'
    }

});

module.exports = mongoose.model('Compra', compraSchema);
