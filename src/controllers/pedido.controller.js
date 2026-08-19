const Pedido = require('../models/pedido.model');

/**
 * Controlador de Pedido.
 *
 * A diferencia de clientes/productos/proveedores, un pedido no tiene un
 * campo de negocio unico (no hay "email" ni "nombre" propio), asi que
 * aqui usamos el _id que genera Mongo por defecto como identificador
 * en las rutas (findById / _id en vez de findOne por otro campo).
 */

// Renderiza el formulario vacio para registrar un nuevo pedido.
exports.formulario = async (req, res) => {
  res.render('pages/pedidos/registrar', { mensaje: "" });
}

// Lista todos los pedidos, mostrando el usuario relacionado (populate).
exports.consultar = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('usuario');
    res.render('pages/pedidos/index', { pedidos: pedidos, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un pedido puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('usuario');
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo pedido a partir de los datos del formulario.
exports.registrar = async (req, res) => {
  try {
    const nuevoPedido = {
      usuario: req.body.usuario,
      estado: req.body.estado
    }

    await Pedido.create(nuevoPedido);
    res.render('pages/pedidos/registrar', { mensaje: "Pedido registrado exitosamente" });

  } catch (error) {
    res.render('pages/pedidos/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un pedido existente (normalmente para cambiar su estado).
exports.actualizar = async (req, res) => {
  try {
    const pedidoActualizado = req.body;

    const resultado = await Pedido.findByIdAndUpdate(req.params.id, { $set: pedidoActualizado });

    if (!resultado) {
      const listaPedidos = await Pedido.find().populate('usuario');
      return res.render('pages/pedidos/index', { pedidos: listaPedidos, mensaje: "Pedido no encontrado" });
    }

    const listaPedidos = await Pedido.find().populate('usuario');
    res.render('pages/pedidos/index', { pedidos: listaPedidos, mensaje: "Pedido actualizado correctamente" });
  } catch (error) {
    const listaPedidos = await Pedido.find().populate('usuario');
    res.render('pages/pedidos/index', { pedidos: listaPedidos, mensaje: "Error al actualizar el pedido" });
  }
}

// Elimina un pedido identificado por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Pedido.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaPedidos = await Pedido.find().populate('usuario');
      return res.render('pages/pedidos/index', { pedidos: listaPedidos, mensaje: "Pedido no encontrado" });
    }

    const listaPedidos = await Pedido.find().populate('usuario');
    res.render('pages/pedidos/index', { pedidos: listaPedidos, mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    const listaPedidos = await Pedido.find().populate('usuario');
    res.render('pages/pedidos/index', { pedidos: listaPedidos, mensaje: "Error al eliminar el pedido" });
  }
}
