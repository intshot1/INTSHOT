const mongoose = require('../config/connectiondb');

/**
 * Modelo de Carrito.
 *
 * Representa cada linea de producto que un usuario ha agregado a su
 * carrito de compras antes de generar un pedido.
 */

const carritoSchema = new mongoose.Schema({

    // Usuario dueño del carrito (referencia al modelo Usuario).
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },

    // Producto agregado al carrito (referencia al modelo Producto).
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El producto es obligatorio']
    },

    // Cantidad de unidades del producto agregadas.
    cantidad: {
        type: Number,
        default: 1,
        min: [1, 'La cantidad debe ser al menos 1']
    },

    // Fecha en la que se agrego el producto al carrito.
    fecha_agregado: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Carrito', carritoSchema);
