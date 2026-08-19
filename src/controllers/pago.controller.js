const Pago = require('../models/pago.model');

/**
 * Controlador de Pago.
 *
 * Registra los pagos asociados a un pedido. Se identifica por _id.
 */

// Renderiza el formulario vacio para registrar un nuevo pago.
exports.formulario = async (req, res) => {
  res.render('pages/pagos/registrar', { mensaje: "" });
}

// Lista todos los pagos, mostrando el pedido relacionado.
exports.consultar = async (req, res) => {
  try {
    const pagos = await Pago.find().populate('pedido');
    res.render('pages/pagos/index', { pagos: pagos, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un pago puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const pago = await Pago.findById(req.params.id).populate('pedido');
    res.json(pago);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo pago asociado a un pedido.
exports.registrar = async (req, res) => {
  try {
    const nuevoPago = {
      pedido: req.body.pedido,
      valor: req.body.valor,
      metodo: req.body.metodo
    }

    await Pago.create(nuevoPago);
    res.render('pages/pagos/registrar', { mensaje: "Pago registrado exitosamente" });

  } catch (error) {
    res.render('pages/pagos/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un pago existente.
exports.actualizar = async (req, res) => {
  try {
    const pagoActualizado = req.body;

    const resultado = await Pago.findByIdAndUpdate(req.params.id, { $set: pagoActualizado });

    if (!resultado) {
      const listaPagos = await Pago.find().populate('pedido');
      return res.render('pages/pagos/index', { pagos: listaPagos, mensaje: "Pago no encontrado" });
    }

    const listaPagos = await Pago.find().populate('pedido');
    res.render('pages/pagos/index', { pagos: listaPagos, mensaje: "Pago actualizado correctamente" });
  } catch (error) {
    const listaPagos = await Pago.find().populate('pedido');
    res.render('pages/pagos/index', { pagos: listaPagos, mensaje: "Error al actualizar el pago" });
  }
}

// Elimina un pago identificado por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Pago.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaPagos = await Pago.find().populate('pedido');
      return res.render('pages/pagos/index', { pagos: listaPagos, mensaje: "Pago no encontrado" });
    }

    const listaPagos = await Pago.find().populate('pedido');
    res.render('pages/pagos/index', { pagos: listaPagos, mensaje: "Pago eliminado correctamente" });
  } catch (error) {
    const listaPagos = await Pago.find().populate('pedido');
    res.render('pages/pagos/index', { pagos: listaPagos, mensaje: "Error al eliminar el pago" });
  }
}
