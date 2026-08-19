const DetalleCompra = require('../models/detalleCompra.model');

/**
 * Controlador de DetalleCompra.
 *
 * Cada registro es una linea de producto dentro de una compra a un
 * proveedor. Se identifica por _id, igual que DetallePedido.
 */

// Renderiza el formulario vacio para registrar un nuevo detalle de compra.
exports.formulario = async (req, res) => {
  res.render('pages/detalleCompras/registrar', { mensaje: "" });
}

// Lista todos los detalles de compra, mostrando compra y producto relacionados.
exports.consultar = async (req, res) => {
  try {
    const detalles = await DetalleCompra.find().populate('compra').populate('producto');
    res.render('pages/detalleCompras/index', { detalles: detalles, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un detalle de compra puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const detalle = await DetalleCompra.findById(req.params.id).populate('compra').populate('producto');
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo detalle de compra (linea de producto dentro de una compra).
exports.registrar = async (req, res) => {
  try {
    const nuevoDetalle = {
      compra: req.body.compra,
      producto: req.body.producto,
      cantidad: req.body.cantidad,
      cantidad_recibida: req.body.cantidad_recibida,
      precio_unitario: req.body.precio_unitario
    }

    await DetalleCompra.create(nuevoDetalle);
    res.render('pages/detalleCompras/registrar', { mensaje: "Detalle de compra registrado exitosamente" });

  } catch (error) {
    res.render('pages/detalleCompras/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un detalle de compra existente (por ejemplo, la cantidad recibida).
exports.actualizar = async (req, res) => {
  try {
    const detalleActualizado = req.body;

    const resultado = await DetalleCompra.findByIdAndUpdate(req.params.id, { $set: detalleActualizado });

    if (!resultado) {
      const listaDetalles = await DetalleCompra.find().populate('compra').populate('producto');
      return res.render('pages/detalleCompras/index', { detalles: listaDetalles, mensaje: "Detalle de compra no encontrado" });
    }

    const listaDetalles = await DetalleCompra.find().populate('compra').populate('producto');
    res.render('pages/detalleCompras/index', { detalles: listaDetalles, mensaje: "Detalle de compra actualizado correctamente" });
  } catch (error) {
    const listaDetalles = await DetalleCompra.find().populate('compra').populate('producto');
    res.render('pages/detalleCompras/index', { detalles: listaDetalles, mensaje: "Error al actualizar el detalle de compra" });
  }
}

// Elimina un detalle de compra identificado por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await DetalleCompra.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaDetalles = await DetalleCompra.find().populate('compra').populate('producto');
      return res.render('pages/detalleCompras/index', { detalles: listaDetalles, mensaje: "Detalle de compra no encontrado" });
    }

    const listaDetalles = await DetalleCompra.find().populate('compra').populate('producto');
    res.render('pages/detalleCompras/index', { detalles: listaDetalles, mensaje: "Detalle de compra eliminado correctamente" });
  } catch (error) {
    const listaDetalles = await DetalleCompra.find().populate('compra').populate('producto');
    res.render('pages/detalleCompras/index', { detalles: listaDetalles, mensaje: "Error al eliminar el detalle de compra" });
  }
}
