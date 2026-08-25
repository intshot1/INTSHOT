const Usuario = require('../models/usuario.model');

// Controlador de Usuario.


// Renderiza el listado principal de usuarios (vista tipo "index").
exports.home = async (req, res) => {
  res.render('pages/usuarios/index', { mensaje: "" });
}

// Renderiza el formulario vacio para registrar un nuevo usuario.
exports.formulario = async (req, res) => {
  res.render('pages/usuarios/registrar', { mensaje: "" });
}

// Lista todos los usuarios registrados.
exports.consultar = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.render('pages/usuarios/index', { usuarios: usuarios, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un usuario puntual por su correo (identificador de negocio).
exports.consultarId = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ correo: req.params.id });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo usuario a partir de los datos del formulario.
exports.registrar = async (req, res) => {
  try {
    const nuevoUsuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      correo: req.body.correo,
      password: req.body.password,
      telefono: req.body.telefono,
      rol: req.body.rol
    }

    await Usuario.create(nuevoUsuario);
    res.render('pages/usuarios/registrar', { mensaje: "Usuario registrado exitosamente" });

  } catch (error) {
    res.render('pages/usuarios/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un usuario existente identificado por su correo.
exports.actualizar = async (req, res) => {
  try {
    const usuarioActualizado = req.body;

    const resultado = await Usuario.updateOne(
      { correo: req.params.id }, { $set: usuarioActualizado }
    );

    if (resultado.matchedCount === 0) {
      const listaUsuarios = await Usuario.find();
      return res.render('pages/usuarios/index', { usuarios: listaUsuarios, mensaje: "Usuario no encontrado" });
    }

    const listaUsuarios = await Usuario.find();
    res.render('pages/usuarios/index', { usuarios: listaUsuarios, mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    const listaUsuarios = await Usuario.find();
    res.render('pages/usuarios/index', { usuarios: listaUsuarios, mensaje: "Error al actualizar el usuario" });
  }
}

// Elimina un usuario identificado por su correo.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Usuario.deleteOne({ correo: req.params.id });

    if (resultado.deletedCount === 0) {
      const listaUsuarios = await Usuario.find();
      return res.render('pages/usuarios/index', { usuarios: listaUsuarios, mensaje: "Usuario no encontrado" });
    }

    const listaUsuarios = await Usuario.find();
    res.render('pages/usuarios/index', { usuarios: listaUsuarios, mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    const listaUsuarios = await Usuario.find();
    res.render('pages/usuarios/index', { usuarios: listaUsuarios, mensaje: "Error al eliminar el usuario" });
  }
}
