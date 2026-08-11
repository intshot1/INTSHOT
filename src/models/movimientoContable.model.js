const mongoose = require('../config/connectiondb');

/**
 * Modelo de MovimientoContable.
 *
 * Registra los ingresos y egresos de dinero del negocio, opcionalmente
 * asociados a un pedido (venta) o a una compra (gasto a proveedor).
 */

const movimientoContableSchema = new mongoose.Schema({

    // Fecha del movimiento contable.
    fecha: {
        type: Date,
        default: Date.now
    },

    // Tipo de movimiento: ingreso o egreso de dinero.
    tipo: {
        type: String,
        enum: ['Ingreso', 'Egreso'],
        required: [true, 'El tipo de movimiento es obligatorio']
    },

    // Valor del movimiento.
    valor: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'El valor es obligatorio']
    },

    // Descripcion del movimiento contable.
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        maxlength: [300, 'La descripcion no puede superar los 300 caracteres']
    },

    // Pedido relacionado, si el movimiento proviene de una venta.
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        default: null
    },

    // Compra relacionada, si el movimiento proviene de una compra a proveedor.
    compra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Compra',
        default: null
    }

});

module.exports = mongoose.model('MovimientoContable', movimientoContableSchema);
