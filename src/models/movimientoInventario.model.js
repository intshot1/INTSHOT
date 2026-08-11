const mongoose = require('../config/connectiondb');

/**
 * Modelo de MovimientoInventario.
 *
 * Registra cada entrada o salida de stock de un producto, permitiendo
 * llevar la trazabilidad del inventario.
 */

const movimientoInventarioSchema = new mongoose.Schema({

    // Producto afectado por el movimiento (referencia al modelo Producto).
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El producto es obligatorio']
    },

    // Cantidad de unidades que entran o salen del inventario.
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },

    // Fecha del movimiento .
    fecha: {
        type: Date,
        default: Date.now
    },

    // Descripcion o motivo del movimiento.
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        maxlength: [200, 'La descripcion no puede superar los 200 caracteres']
    },

    // Tipo de movimiento: entrada o salida de inventario.
    tipo: {
        type: String,
        enum: ['Entrada', 'Salida'],
        required: [true, 'El tipo de movimiento es obligatorio']
    }

});

module.exports = mongoose.model('MovimientoInventario', movimientoInventarioSchema);
