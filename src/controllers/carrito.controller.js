const Carrito = require('../models/carrito.model');
const Producto = require('../models/producto.model');

// Controlador de Carrito.

 

// Renderiza el formulario vacio para agregar un producto al carrito.
exports.formulario = async (req, res) => {
  res.render('pages/carritos/registrar', { mensaje: "" });
}

// Lista el carrito del cliente que inicio sesion (req.usuario lo deja el
// middleware de autorizacion), mostrando el producto relacionado.
exports.consultar = async (req, res) => {
  try {
    const carrito = await Carrito.find({ usuario: req.usuario.id }).populate('usuario').populate('producto');
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
    const usuario = req.usuario.id;
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

// Boton "Agregar al carrito" del catalogo: suma una unidad del producto al
// carrito del cliente y lo devuelve al catalogo con un mensaje.
exports.agregar = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto || producto.stock <= 0) {
      return res.redirect('/catalogo?mensaje=El producto ya no está disponible');
    }

    const lineaExistente = await Carrito.findOne({ usuario: req.usuario.id, producto: producto._id });

    if (lineaExistente) {
      lineaExistente.cantidad += 1;
      await lineaExistente.save();
    } else {
      await Carrito.create({ usuario: req.usuario.id, producto: producto._id, cantidad: 1 });
    }

    res.redirect('/catalogo?mensaje=Producto ' + encodeURIComponent(producto.nombre) + ' agregado al carrito');
  } catch (error) {
    res.redirect('/catalogo?mensaje=Error al agregar el producto al carrito');
  }
}

// Actualiza la cantidad (u otro dato) de una linea del carrito.
exports.actualizar = async (req, res) => {
  try {
    // Solo se deja cambiar la cantidad, y solo de lineas del propio cliente.
    const lineaActualizada = { cantidad: req.body.cantidad };

    const resultado = await Carrito.findOneAndUpdate({ _id: req.params.id, usuario: req.usuario.id }, { $set: lineaActualizada }, { runValidators: true });

    if (!resultado) {
      const listaCarrito = await Carrito.find({ usuario: req.usuario.id }).populate('usuario').populate('producto');
      return res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Linea de carrito no encontrada" });
    }

    const listaCarrito = await Carrito.find({ usuario: req.usuario.id }).populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Carrito actualizado correctamente" });
  } catch (error) {
    const listaCarrito = await Carrito.find({ usuario: req.usuario.id }).populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Error al actualizar el carrito" });
  }
}

// Elimina una linea del carrito identificada por su _id.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Carrito.findOneAndDelete({ _id: req.params.id, usuario: req.usuario.id });

    if (!resultado) {
      const listaCarrito = await Carrito.find({ usuario: req.usuario.id }).populate('usuario').populate('producto');
      return res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Linea de carrito no encontrada" });
    }

    const listaCarrito = await Carrito.find({ usuario: req.usuario.id }).populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Producto eliminado del carrito" });
  } catch (error) {
    const listaCarrito = await Carrito.find({ usuario: req.usuario.id }).populate('usuario').populate('producto');
    res.render('pages/carritos/index', { carrito: listaCarrito, mensaje: "Error al eliminar el producto del carrito" });
  }
}
