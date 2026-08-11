const mongoose = require('../config/connectiondb');

/**
 * Modelo de Pedido.
 *
 * Representa una orden de compra generada por un usuario/cliente,
 * junto con su estado dentro del flujo de ventas.
 */

const pedidoSchema = new mongoose.Schema({

    // Usuario que realizo el pedido (referencia al modelo Usuario).
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },

    // Fecha de creacion del pedido.
    fecha: {
        type: Date,
        default: Date.now
    },

    // Estado actual del pedido dentro del flujo de ventas.
    estado: {
        type: String,
        enum: ['Pendiente', 'En proceso', 'Enviado', 'Entregado', 'Cancelado'],
        default: 'Pendiente'
    }

});


module.exports = mongoose.model('Pedido', pedidoSchema);
