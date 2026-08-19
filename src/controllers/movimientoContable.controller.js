const MovimientoContable = require('../models/movimientoContable.model');

/**
 * Controlador de MovimientoContable.
 *
 * Registra ingresos y egresos de dinero del negocio, opcionalmente
 * relacionados a un pedido o a una compra. Se identifica por _id.
 */

// Renderiza el formulario vacio para registrar un nuevo movimiento contable.
exports.formulario = async (req, res) => {
  res.render('pages/movimientosContables/registrar', { mensaje: "" });
}

// Lista todos los movimientos contables, mostrando pedido y compra relacionados.
exports.consultar = async (req, res) => {
  try {
    const movimientos = await MovimientoContable.find().populate('pedido').populate('compra');
    res.render('pages/movimientosContables/index', { movimientos: movimientos, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un movimiento contable puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const movimiento = await MovimientoContable.findById(req.params.id).populate('pedido').populate('compra');
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo movimiento contable (ingreso o egreso).
exports.registrar = async (req, res) => {
  try {
    const nuevoMovimiento = {
      tipo: req.body.tipo,
      valor: req.body.valor,
      descripcion: req.body.descripcion,
      pedido: req.body.pedido || null,
      compra: req.body.compra || null
    }

    await MovimientoContable.create(nuevoMovimiento);
    res.render('pages/movimientosContables/registrar', { mensaje: "Movimiento contable registrado exitosamente" });

  } catch (error) {
    res.render('pages/movimientosContables/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un movimiento contable existente.
exports.actualizar = async (req, res) => {
  try {
    const movimientoActualizado = req.body;

    const resultado = await MovimientoContable.findByIdAndUpdate(req.params.id, { $set: movimientoActualizado });

    if (!resultado) {
      const listaMovimientos = await MovimientoContable.find().populate('pedido').populate('compra');
      return res.render('pages/movimientosContables/index', { movimientos: listaMovimientos, mensaje: "Movimiento no encontrado" });
    }

    const listaMovimientos = await MovimientoContable.find().populate('pedido').populate('compra');
    res.render('pages/movimientosContables/index', { movimientos: listaMovimientos, mensaje: "Movimiento actualizado correctamente" });
  } catch (error) {
    const listaMovimientos = await MovimientoContable.find().populate('pedido').populate('compra');
    res.render('pages/movimientosContables/index', { movimientos: listaMovimientos, mensaje: "Error al actualizar el movimiento" });
  }
}

// Elimina un movimiento contable identificado por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await MovimientoContable.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaMovimientos = await MovimientoContable.find().populate('pedido').populate('compra');
      return res.render('pages/movimientosContables/index', { movimientos: listaMovimientos, mensaje: "Movimiento no encontrado" });
    }

    const listaMovimientos = await MovimientoContable.find().populate('pedido').populate('compra');
    res.render('pages/movimientosContables/index', { movimientos: listaMovimientos, mensaje: "Movimiento eliminado correctamente" });
  } catch (error) {
    const listaMovimientos = await MovimientoContable.find().populate('pedido').populate('compra');
    res.render('pages/movimientosContables/index', { movimientos: listaMovimientos, mensaje: "Error al eliminar el movimiento" });
  }
}
