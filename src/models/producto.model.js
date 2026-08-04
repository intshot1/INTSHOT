const mongoose = require('../config/connectiondb');

/**
 * Modelo de Producto.
 *
 * Representa cada prenda o articulo disponible en el catalogo, junto con
 * su informacion de inventario, precio e imagen.
 */

const productoSchema = new mongoose.Schema({

    // Nombre comercial del producto.
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [100, 'El nombre no puede superar los 100 caracteres']
    },

    // Color del producto.
    color: {
        type: String,
        required: [true, 'El color es obligatorio'],
        maxlength: [30, 'El color no puede superar los 30 caracteres']
    },

    // Descripcion breve del producto.
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        maxlength: [254, 'La descripcion no puede superar los 254 caracteres']
    },

    // Talla del producto (S, M, L, 32, etc).
    talla: {
        type: String,
        required: [true, 'La talla es obligatoria'],
        maxlength: [10, 'La talla no puede superar los 10 caracteres']
    },

    // Cantidad disponible en inventario.
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },

    // Precio de venta del producto. Se usa Decimal128 para evitar errores de redondeo.
    precio: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'El precio es obligatorio']
    },

    // Categoria a la que pertenece el producto.
    categoria: {
        type: String,
        required: [true, 'La categoria es obligatoria'],
        enum: ['Camisetas', 'Pantalones', 'Chaquetas', 'Accesorios', 'Insumos', 'Otros']
    },

    // Ruta o URL de la imagen del producto.
    imagen: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

// Representacion legible del producto (equivalente al __str__ ).
productoSchema.methods.toString = function () {
    return `${this._id} - ${this.nombre} ${this.talla} - Color: ${this.color}`;
};

module.exports = mongoose.model('Producto', productoSchema);
