const mongoose = require('../config/connectiondb');
const bcrypt = require('bcryptjs');

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


// Hashea el password antes de guardar (Usuario.create / documento.save()),
// pero solo si el campo password fue modificado. Sin este "if", cada vez que
// se guardara el usuario por cualquier otro motivo (ej. actualizar el rol)
// se volveria a hashear un password que ya estaba hasheado, dejandolo
// irreconocible y bloqueando el login.
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Usuario.updateOne() y Usuario.findOneAndUpdate() son "query middleware":
// NO disparan el hook 'save' de arriba porque no cargan un documento completo,
// solo mandan una instruccion de actualizacion directa a MongoDB. Esto importa
// porque usuario.controller.js#actualizar usa updateOne(): sin este segundo
// hook, si un administrador cambia el password de alguien desde el panel,
// quedaria guardado en texto plano sin que nada lo evite.
usuarioSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
    const update = this.getUpdate();
    const nuevaPassword = update?.password ?? update?.$set?.password;

    if (!nuevaPassword) {
        return next();
    }

    const hash = await bcrypt.hash(nuevaPassword, 10);

    if (update.password) {
        update.password = hash;
    } else {
        update.$set.password = hash;
    }

    next();
});

// Compara un password en texto plano (lo que escribe el usuario en el form)
// contra el hash guardado en este documento. Devuelve true/false.
usuarioSchema.methods.compararPassword = function (passwordPlano) {
    return bcrypt.compare(passwordPlano, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
