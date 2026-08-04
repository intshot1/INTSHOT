const mongoose = require('../config/connectiondb');

/**
 * Modelo de Usuario.
 *
 * Representa a las personas que interactuan con el sistema: administradores,
 * empleados y clientes. Controla identidad, credenciales y rol funcional.
 */

const usuarioSchema = new mongoose.Schema({

    // Nombre de pila del usuario.
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [100, 'El nombre no puede superar los 100 caracteres']
    },

    // Apellido del usuario.
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        maxlength: [100, 'El apellido no puede superar los 100 caracteres']
    },

    // Correo unico que identifica la cuenta dentro del sistema.
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: [true, 'El correo debe ser unico'],
        trim: true,
        lowercase: true
    },

    // Contraseña del usuario. 
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        trim: true
    },

    // Numero de telefono de contacto.
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        maxlength: [20, 'El telefono no puede superar los 20 caracteres']
    },

    // Rol funcional para controlar permisos y responsabilidades del usuario.
    rol: {
        type: String,
        enum: ['Administrador', 'Empleado', 'Cliente'],
        default: 'Cliente'
    }

},);


module.exports = mongoose.model('Usuario', usuarioSchema);
