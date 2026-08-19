const Producto = require('../models/producto.model');

// Controlador de Producto.
 

// Endpoint publico usado por el catalogo (por ejemplo, desde el carrito del landing).
exports.catalogo = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Renderiza el formulario vacio para registrar un nuevo producto.
exports.formulario = async (req, res) => {
  res.render('pages/productos/registrar', { mensaje: "" });
}

// Lista todos los productos del inventario.
exports.consultar = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('pages/productos/index', { productos: productos, mensaje: "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Busca un producto puntual por su nombre.
exports.consultarId = async (req, res) => {
  try {
    const producto = await Producto.findOne({ nombre: req.params.id });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registra un nuevo producto a partir de los datos del formulario.
exports.registrar = async (req, res) => {
  try {
    const nuevoProducto = {
      nombre: req.body.nombre,
      color: req.body.color,
      descripcion: req.body.descripcion,
      talla: req.body.talla,
      stock: req.body.stock,
      precio: req.body.precio,
      categoria: req.body.categoria,
      imagen: req.body.imagen
    }

    await Producto.create(nuevoProducto);
    res.render('pages/productos/registrar', { mensaje: "Producto registrado exitosamente" });

  } catch (error) {
    res.render('pages/productos/registrar', { mensaje: "Error en el registro" });
  }
}

// Actualiza un producto existente identificado por su nombre.
exports.actualizar = async (req, res) => {
  try {
    const productoActualizado = req.body;

    const resultado = await Producto.updateOne(
      { nombre: req.params.id }, { $set: productoActualizado }
    );

    if (resultado.matchedCount === 0) {
      const listaProductos = await Producto.find();
      return res.render('pages/productos/index', { productos: listaProductos, mensaje: "Producto no encontrado" });
    }

    const listaProductos = await Producto.find();
    res.render('pages/productos/index', { productos: listaProductos, mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    const listaProductos = await Producto.find();
    res.render('pages/productos/index', { productos: listaProductos, mensaje: "Error al actualizar el producto" });
  }
}

// Elimina un producto identificado por su nombre.
exports.eliminar = async (req, res) => {
  try {
    const resultado = await Producto.deleteOne({ nombre: req.params.id });

    if (resultado.deletedCount === 0) {
      const listaProductos = await Producto.find();
      return res.render('pages/productos/index', { productos: listaProductos, mensaje: "Producto no encontrado" });
    }

    const listaProductos = await Producto.find();
    res.render('pages/productos/index', { productos: listaProductos, mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    const listaProductos = await Producto.find();
    res.render('pages/productos/index', { productos: listaProductos, mensaje: "Error al eliminar el producto" });
  }
}
