const Compra = require('../models/compra.model');

/**
 * Controlador de Compra (orden de compra a un proveedor).
 *
 * Sin campo de negocio unico, se identifica por _id.
 */

// Renderiza el formulario vacio para registrar una nueva compra.
exports.formulario = async (req, res) => {
  res.render('pages/compras/registrar', { mensaje: "" });
}

// Lista todas las compras, mostrando el proveedor relacionado.
exports.consultar = async (req, res) => {
  try {
    const compras = await Compra.find().populate('proveedor');
    res.render('pages/compras/index', { compras: compras, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca una compra puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id).populate('proveedor');
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra una nueva compra a un proveedor.
exports.registrar = async (req, res) => {
  try {
    const nuevaCompra = {
      proveedor: req.body.proveedor,
      estado: req.body.estado
    }

    await Compra.create(nuevaCompra);
    res.render('pages/compras/registrar', { mensaje: "Compra registrada exitosamente" });

  } catch (error) {
    res.render('pages/compras/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza una compra existente (por ejemplo, para cambiar su estado).
exports.actualizar = async (req, res) => {
  try {
    const compraActualizada = req.body;

    const resultado = await Compra.findByIdAndUpdate(req.params.id, { $set: compraActualizada });

    if (!resultado) {
      const listaCompras = await Compra.find().populate('proveedor');
      return res.render('pages/compras/index', { compras: listaCompras, mensaje: "Compra no encontrada" });
    }

    const listaCompras = await Compra.find().populate('proveedor');
    res.render('pages/compras/index', { compras: listaCompras, mensaje: "Compra actualizada correctamente" });
  } catch (error) {
    const listaCompras = await Compra.find().populate('proveedor');
    res.render('pages/compras/index', { compras: listaCompras, mensaje: "Error al actualizar la compra" });
  }
}

// Elimina una compra identificada por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Compra.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaCompras = await Compra.find().populate('proveedor');
      return res.render('pages/compras/index', { compras: listaCompras, mensaje: "Compra no encontrada" });
    }

    const listaCompras = await Compra.find().populate('proveedor');
    res.render('pages/compras/index', { compras: listaCompras, mensaje: "Compra eliminada correctamente" });
  } catch (error) {
    const listaCompras = await Compra.find().populate('proveedor');
    res.render('pages/compras/index', { compras: listaCompras, mensaje: "Error al eliminar la compra" });
  }
}
