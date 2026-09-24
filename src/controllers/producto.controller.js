const Producto = require('../models/producto.model');

// Controlador de Producto.
 

// Categorias que se muestran en el filtro del catalogo (las mismas del modelo).
const categorias = ['Camisetas', 'Pantalones', 'Chaquetas', 'Accesorios', 'Insumos', 'Otros'];

// Cantidad de productos que se muestran por pagina en el catalogo.
const PRODUCTOS_POR_PAGINA = 12;

// Catalogo de la tienda: solo productos con stock, con buscador, filtro por
// categoria y paginacion (igual que ver_catalogo del proyecto en Django).
exports.catalogo = async (req, res) => {
  try {
    const buscar = req.query.buscar || "";
    const categoria = req.query.categoria || "";
    const pagina = Number(req.query.pagina) || 1;

    // Filtro base: solo lo que se puede comprar.
    const filtro = { stock: { $gt: 0 } };

    if (buscar) {
      // "i" = sin importar mayusculas/minusculas. Se escapan los caracteres
      // especiales para que el texto se busque tal cual lo escribio el usuario.
      const texto = new RegExp(buscar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filtro.$or = [{ nombre: texto }, { descripcion: texto }, { color: texto }];
    }
    if (categoria) {
      filtro.categoria = categoria;
    }

    const total = await Producto.countDocuments(filtro);
    const totalPaginas = Math.max(Math.ceil(total / PRODUCTOS_POR_PAGINA), 1);

    const productos = await Producto.find(filtro)
      .sort({ nombre: 1 })
      .skip((pagina - 1) * PRODUCTOS_POR_PAGINA)
      .limit(PRODUCTOS_POR_PAGINA);

    res.render('pages/catalogo/index', {
      productos: productos,
      buscar: buscar,
      categoria: categoria,
      categorias: categorias,
      pagina: pagina,
      totalPaginas: totalPaginas,
      total: total,
      mensaje: req.query.mensaje || ""
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Ficha con toda la informacion de un producto, mas otros de la misma categoria.
exports.detalleCatalogo = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.redirect('/catalogo?mensaje=El producto que buscas ya no está disponible');
    }

    const relacionados = await Producto.find({
      categoria: producto.categoria,
      stock: { $gt: 0 },
      _id: { $ne: producto._id }
    }).sort({ nombre: 1 }).limit(4);

    res.render('pages/catalogo/detalle', { producto: producto, relacionados: relacionados, mensaje: "" });
  } catch (error) {
    res.redirect('/catalogo?mensaje=El producto que buscas ya no está disponible');
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
