const mongoose = require('../config/connectiondb');

/**
 * Modelo de Pago.
 *
 * Representa el registro de pago asociado a un pedido, incluyendo
 * el valor cancelado y el metodo utilizado.
 */

const pagoSchema = new mongoose.Schema({

    // Pedido al que corresponde este pago (referencia al modelo Pedido).
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: [true, 'El pedido es obligatorio']
    },

    // Valor pagado.
    valor: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'El valor es obligatorio']
    },

    // Fecha en la que se registro el pago.
    fecha: {
        type: Date,
        default: Date.now
    },

    // Metodo utilizado para realizar el pago.
    metodo: {
        type: String,
        enum: ['Efectivo', 'Tarjeta', 'Transferencia'],
        required: [true, 'El metodo de pago es obligatorio']
    }

});

module.exports = mongoose.model('Pago', pagoSchema);
