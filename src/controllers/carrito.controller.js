const Carrito = require('../models/carrito.model');

// Controlador de Carrito.

 

// Renderiza el formulario vacio para agregar un producto al carrito.
exports.formulario = async (req, res) => {
  res.render('pages/carritos/registrar', { mensaje: "" });
}

// Lista todo el contenido del carrito, mostrando usuario y producto relacionados.
exports.consultar = async (req, res) => {
  try {
    const carrito = await Carrito.find().populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: carrito, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca una linea de carrito puntual por su _id.
exports.consultarId = async (req, res) => {
  try {
    const linea = await Carrito.findById(req.params.id).populate('usuario').populate('producto');
    res.json(linea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agrega un producto al carrito. Si el usuario ya tiene ese producto en el
// carrito, se suma la cantidad en vez de crear una linea duplicada.
exports.registrar = async (req, res) => {
  try {
    const usuario = req.body.usuario;
    const producto = req.body.producto;
    const cantidad = Number(req.body.cantidad) || 1;

    const lineaExistente = await Carrito.findOne({ usuario: usuario, producto: producto });

    if (lineaExistente) {
      lineaExistente.cantidad += cantidad;
      await lineaExistente.save();
    } else {
      await Carrito.create({ usuario: usuario, producto: producto, cantidad: cantidad });
    }

    res.render('pages/carritos/registrar', { mensaje: "Producto agregado al carrito" });

  } catch (error) {
    res.render('pages/carritos/registrar', { mensaje: "Error al agregar el producto al carrito" });
  }
}

// Actualiza la cantidad (u otro dato) de una linea del carrito.
exports.actualizar = async (req, res) => {
  try {
    const lineaActualizada = req.body;

    const resultado = await Carrito.findByIdAndUpdate(req.params.id, { $set: lineaActualizada });

    if (!resultado) {
      const listaCarrito = await Carrito.find().populate('usuario').populate('producto');
      return res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Linea de carrito no encontrada" });
    }

    const listaCarrito = await Carrito.find().populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Carrito actualizado correctamente" });
  } catch (error) {
    const listaCarrito = await Carrito.find().populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Error al actualizar el carrito" });
  }
}

// Elimina una linea del carrito identificada por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Carrito.findByIdAndDelete(req.params.id);

    if (!resultado) {
      const listaCarrito = await Carrito.find().populate('usuario').populate('producto');
      return res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Linea de carrito no encontrada" });
    }

    const listaCarrito = await Carrito.find().populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Producto eliminado del carrito" });
  } catch (error) {
    const listaCarrito = await Carrito.find().populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Error al eliminar el producto del carrito" });
  }
}
