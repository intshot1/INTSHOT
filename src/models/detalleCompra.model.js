const mongoose = require('../config/connectiondb');

/**
 * Modelo de DetalleCompra.
 *
 * Representa cada linea de producto dentro de una compra a proveedor,
 * controlando lo pedido frente a lo efectivamente recibido.
 */

const detalleCompraSchema = new mongoose.Schema({

    // Compra a la que pertenece este detalle (referencia al modelo Compra).
    compra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compra',
        required: [true, 'La compra es obligatoria']
    },

    // Producto incluido en la compra (referencia al modelo Producto).
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El producto es obligatorio']
    },

    // Cantidad solicitada al proveedor.
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },

    // Cantidad efectivamente recibida hasta el momento.
    cantidad_recibida: {
        type: Number,
        default: 0
    },

    // Precio unitario acordado con el proveedor.
    precio_unitario: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'El precio unitario es obligatorio']
    }

});

module.exports = mongoose.model('DetalleCompra', detalleCompraSchema);
