const Usuario = require('../models/usuario.model');

// Controlador de autenticacion.

// Muestra la pagina de aterrizaje con el modal de login.
exports.landing = async (req, res) => {
  res.render('pages/landing', { mensaje: "" });
}

// Valida las credenciales contra la coleccion de usuarios.
exports.login = async (req, res) => {
  try {
    const correo = req.body.correo;
    const password = req.body.password;

    const usuario = await Usuario.findOne({ correo: correo, password: password });

    if (usuario) {
      res.redirect('/inicio');
    } else {
      res.render('pages/landing', { mensaje: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    res.render('pages/landing', { mensaje: "Error al iniciar sesion" });
  }
}
