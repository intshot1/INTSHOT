const DetallePedido = require('../models/detallePedido.model');

/**
 * Controlador de DetallePedido.
 *
 * Cada registro es una linea de producto dentro de un pedido. Igual que
 * en Pedido, no hay un campo de negocio unico, por lo que se identifica
 * cada detalle por su _id de Mongo.
 */

// Renderiza el formulario vacio para registrar un nuevo detalle de pedido.
exports.formulario = async (req, res) => {
  res.render('pages/detallePedidos/registrar', { mensaje: "" });
}

// Lista todos los detalles de pedido, mostrando pedido y producto relacionados.
exports.consultar = async (req, res) => {
  try {
    const detalles = await DetallePedido.find().populate('pedido').populate('producto');
    res.render('pages/detallePedidos/index', { detalles: detalles, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un detalle de pedido puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const detalle = await DetallePedido.findById(req.params.id).populate('pedido').populate('producto');
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo detalle de pedido (linea de producto dentro de un pedido).
exports.registrar = async (req, res) => {
  try {
    const nuevoDetalle = {
      pedido: req.body.pedido,
      producto: req.body.producto,
      cantidad: req.body.cantidad,
      precio_unitario: req.body.precio_unitario
    }

    await DetallePedido.create(nuevoDetalle);
    res.render('pages/detallePedidos/registrar', { mensaje: "Detalle de pedido registrado exitosamente" });

  } catch (error) {
    res.render('pages/detallePedidos/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un detalle de pedido existente.
exports.actualizar = async (req, res) => {
  try {
    const detalleActualizado = req.body;

    const resultado = await DetallePedido.findByIdAndUpdate(req.params.id, { $set: detalleActualizado });

    if (!resultado) {
      const listaDetalles = await DetallePedido.find().populate('pedido').populate('producto');
      return res.render('pages/detallePedidos/index', { detalles: listaDetalles, mensaje: "Detalle de pedido no encontrado" });
    }

    const listaDetalles = await DetallePedido.find().populate('pedido').populate('producto');
    res.render('pages/detallePedidos/index', { detalles: listaDetalles, mensaje: "Detalle de pedido actualizado correctamente" });
  } catch (error) {
    const listaDetalles = await DetallePedido.find().populate('pedido').populate('producto');
    res.render('pages/detallePedidos/index', { detalles: listaDetalles, mensaje: "Error al actualizar el detalle de pedido" });
  }
}

// Elimina un detalle de pedido identificado por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await DetallePedido.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaDetalles = await DetallePedido.find().populate('pedido').populate('producto');
      return res.render('pages/detallePedidos/index', { detalles: listaDetalles, mensaje: "Detalle de pedido no encontrado" });
    }

    const listaDetalles = await DetallePedido.find().populate('pedido').populate('producto');
    res.render('pages/detallePedidos/index', { detalles: listaDetalles, mensaje: "Detalle de pedido eliminado correctamente" });
  } catch (error) {
    const listaDetalles = await DetallePedido.find().populate('pedido').populate('producto');
    res.render('pages/detallePedidos/index', { detalles: listaDetalles, mensaje: "Error al eliminar el detalle de pedido" });
  }
}
