const Proveedor = require('../models/proveedor.model');

/**
 * Controlador de Proveedor.
 *
 * El correo es unico en el modelo, asi que lo usamos como identificador
 * de negocio, igual que con clientes/usuarios.
 */

// Renderiza el formulario vacio para registrar un nuevo proveedor.
exports.formulario = async (req, res) => {
  res.render('pages/proveedores/registrar', { mensaje: "" });
}

// Lista todos los proveedores.
exports.consultar = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.render('pages/proveedores/index', { proveedores: proveedores, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un proveedor puntual por su correo.
exports.consultarId = async (req, res) => {
  try {
    const proveedor = await Proveedor.findOne({ correo: req.params.id });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo proveedor a partir de los datos del formulario.
exports.registrar = async (req, res) => {
  try {
    const nuevoProveedor = {
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      correo: req.body.correo
    }

    await Proveedor.create(nuevoProveedor);
    res.render('pages/proveedores/registrar', { mensaje: "Proveedor registrado exitosamente" });

  } catch (error) {
    res.render('pages/proveedores/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un proveedor existente identificado por su correo.
exports.actualizar = async (req, res) => {
  try {
    const proveedorActualizado = req.body;

    const resultado = await Proveedor.updateOne(
      { correo: req.params.id }, { $set: proveedorActualizado }
    );

    if (resultado.matchedCount === 0) {
      const listaProveedores = await Proveedor.find();
      return res.render('pages/proveedores/index', { proveedores: listaProveedores, mensaje: "Proveedor no encontrado" });
    }

    const listaProveedores = await Proveedor.find();
    res.render('pages/proveedores/index', { proveedores: listaProveedores, mensaje: "Proveedor actualizado correctamente" });
  } catch (error) {
    const listaProveedores = await Proveedor.find();
    res.render('pages/proveedores/index', { proveedores: listaProveedores, mensaje: "Error al actualizar el proveedor" });
  }
}

// Elimina un proveedor identificado por su correo.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Proveedor.deleteOne({ correo: req.params.id });

    if (resultado.deletedCount === 0) {
      const listaProveedores = await Proveedor.find();
      return res.render('pages/proveedores/index', { proveedores: listaProveedores, mensaje: "Proveedor no encontrado" });
    }

    const listaProveedores = await Proveedor.find();
    res.render('pages/proveedores/index', { proveedores: listaProveedores, mensaje: "Proveedor eliminado correctamente" });
  } catch (error) {
    const listaProveedores = await Proveedor.find();
    res.render('pages/proveedores/index', { proveedores: listaProveedores, mensaje: "Error al eliminar el proveedor" });
  }
}
