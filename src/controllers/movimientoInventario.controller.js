const MovimientoInventario = require('../models/movimientoInventario.model');

/**
 * Controlador de MovimientoInventario.
 *
 * Registra entradas y salidas de stock de un producto. Se identifica por
 * _id, ya que cada movimiento es un registro historico sin campo unico.
 */

// Renderiza el formulario vacio para registrar un nuevo movimiento de inventario.
exports.formulario = async (req, res) => {
  res.render('pages/movimientosInventario/registrar', { mensaje: "" });
}

// Lista todos los movimientos de inventario, mostrando el producto relacionado.
exports.consultar = async (req, res) => {
  try {
    const movimientos = await MovimientoInventario.find().populate('producto');
    res.render('pages/movimientosInventario/index', { movimientos: movimientos, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un movimiento de inventario puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const movimiento = await MovimientoInventario.findById(req.params.id).populate('producto');
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo movimiento de inventario (entrada o salida de stock).
exports.registrar = async (req, res) => {
  try {
    const nuevoMovimiento = {
      producto: req.body.producto,
      cantidad: req.body.cantidad,
      descripcion: req.body.descripcion,
      tipo: req.body.tipo
    }

    await MovimientoInventario.create(nuevoMovimiento);
    res.render('pages/movimientosInventario/registrar', { mensaje: "Movimiento de inventario registrado exitosamente" });

  } catch (error) {
    res.render('pages/movimientosInventario/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un movimiento de inventario existente.
exports.actualizar = async (req, res) => {
  try {
    const movimientoActualizado = req.body;

    const resultado = await MovimientoInventario.findByIdAndUpdate(req.params.id, { $set: movimientoActualizado });

    if (!resultado) {
      const listaMovimientos = await MovimientoInventario.find().populate('producto');
      return res.render('pages/movimientosInventario/index', { movimientos: listaMovimientos, mensaje: "Movimiento no encontrado" });
    }

    const listaMovimientos = await MovimientoInventario.find().populate('producto');
    res.render('pages/movimientosInventario/index', { movimientos: listaMovimientos, mensaje: "Movimiento actualizado correctamente" });
  } catch (error) {
    const listaMovimientos = await MovimientoInventario.find().populate('producto');
    res.render('pages/movimientosInventario/index', { movimientos: listaMovimientos, mensaje: "Error al actualizar el movimiento" });
  }
}

// Elimina un movimiento de inventario identificado por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await MovimientoInventario.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaMovimientos = await MovimientoInventario.find().populate('producto');
      return res.render('pages/movimientosInventario/index', { movimientos: listaMovimientos, mensaje: "Movimiento no encontrado" });
    }

    const listaMovimientos = await MovimientoInventario.find().populate('producto');
    res.render('pages/movimientosInventario/index', { movimientos: listaMovimientos, mensaje: "Movimiento eliminado correctamente" });
  } catch (error) {
    const listaMovimientos = await MovimientoInventario.find().populate('producto');
    res.render('pages/movimientosInventario/index', { movimientos: listaMovimientos, mensaje: "Error al eliminar el movimiento" });
  }
}
