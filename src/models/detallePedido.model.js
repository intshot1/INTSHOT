const mongoose = require('../config/connectiondb');

/**
 * Modelo de DetallePedido.
 *
 * Representa cada linea de producto dentro de un pedido, con la
 * cantidad y el precio unitario acordado al momento de la compra.
 */

const detallePedidoSchema = new mongoose.Schema({

    // Pedido al que pertenece este detalle (referencia al modelo Pedido).
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: [true, 'El pedido es obligatorio']
    },

    // Producto incluido en el pedido (referencia al modelo Producto).
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El producto es obligatorio']
    },

    // Cantidad de unidades pedidas de este producto.
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },

    // Precio unitario del producto al momento del pedido (puede diferir del precio actual del producto).
    precio_unitario: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'El precio unitario es obligatorio']
    }

});

module.exports = mongoose.model('DetallePedido', detallePedidoSchema);
