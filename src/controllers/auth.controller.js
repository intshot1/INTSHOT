const Usuario = require('../models/usuario.model');
const { generarToken } = require('../utils/jwt.util');

// Controlador de autenticacion.

// Muestra la pagina de aterrizaje con el modal de login.
exports.landing = async (req, res) => {
  res.render('pages/landing', { mensaje: "" });
}

// Muestra el formulario de inicio de sesion (pages/login.ejs).
exports.mostrarLogin = async (req, res) => {
  res.render('pages/login', { mensaje: "" });
}

// Muestra el formulario de registro publico (pages/registro.ejs).
exports.mostrarRegistro = async (req, res) => {
  res.render('pages/registro', { mensaje: "" });
}

// Procesa el registro publico (distinto del registro que hace un Administrador
// desde el panel de usuarios: usuario.controller.js#registrar). Ambos flujos
// crean documentos Usuario, y en la Fase 1 los dos quedaran protegidos por el
// mismo hook de hashing en el modelo, sin duplicar logica de seguridad.
exports.registro = async (req, res) => {
  try {
    const { nombre, apellido, telefono, correo, password, veri_password } = req.body;

    if (password !== veri_password) {
      return res.render('pages/registro', { mensaje: "Las contraseñas no coinciden" });
    }

    await Usuario.create({ nombre, apellido, telefono, correo, password });
    res.render('pages/login', { mensaje: "Registro exitoso, ya puedes iniciar sesion" });
  } catch (error) {
    res.render('pages/registro', { mensaje: "Error en el registro" });
  }
}

// Valida las credenciales contra la coleccion de usuarios.
exports.login = async (req, res) => {
  try {
    // String(...) evita que un valor no-string (ej. un objeto armado con
    // notacion de corchetes en el form, tipo "correo[$ne]=") llegue crudo
    // a la consulta de Mongo.
    const correo = String(req.body.correo || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    // La busqueda es SOLO por correo. Nunca se debe incluir el password
    // dentro de un findOne: ya no tendria sentido (esta hasheado, nunca
    // haria match) y ademas amplia la superficie de ataque innecesariamente.
    const usuario = await Usuario.findOne({ correo });

    const passwordValida = usuario ? await usuario.compararPassword(password) : false;

    if (usuario && passwordValida) {
      const { token, expira } = generarToken(usuario);

      res.cookie('token', token, {
        httpOnly: true,                                 // JS del navegador no puede leerla (mitiga robo del token via XSS)
        secure: process.env.NODE_ENV === 'production',   // solo viaja por HTTPS en produccion
        sameSite: 'strict',                               // no se envia en requests originados desde otros sitios (mitiga CSRF)
        expires: expira,                                  // misma expiracion que el propio JWT
      });

      res.redirect('/inicio');
    } else {
      res.render('pages/landing', { mensaje: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    res.render('pages/landing', { mensaje: "Error al iniciar sesion" });
  }
}
