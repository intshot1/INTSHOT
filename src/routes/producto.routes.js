const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const productoController = require('../controllers/producto.controller');

// Catalogo de la tienda, pensado para el cliente que va a comprar.
// Admite filtros por la URL: /catalogo?buscar=camisa&categoria=Camisetas&pagina=2
router.get('/catalogo', autorizacion(['Cliente']), productoController.catalogo);
router.get('/catalogo/:id', autorizacion(['Cliente']), productoController.detalleCatalogo);

// Formulario para registrar un producto nuevo.
router.get('/productos/formulario', autorizacion(['Administrador', 'Empleado']), productoController.formulario);

// CRUD de productos. El identificador de la URL es el nombre del producto.
router.get('/productos', autorizacion(['Administrador', 'Empleado']), productoController.consultar);
router.get('/productos/:id', autorizacion(['Administrador', 'Empleado']), productoController.consultarId);
router.post('/productos', autorizacion(['Administrador', 'Empleado']), productoController.registrar);
router.put('/productos/:id', autorizacion(['Administrador', 'Empleado']), productoController.actualizar);
router.delete('/productos/:id', autorizacion(['Administrador', 'Empleado']), productoController.eliminar);

module.exports = router;
