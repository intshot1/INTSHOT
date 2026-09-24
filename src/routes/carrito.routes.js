const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const carritoController = require('../controllers/carrito.controller');

// Formulario para agregar manualmente una linea al carrito.
router.get('/carritos/formulario', autorizacion(['Cliente']), carritoController.formulario);

// Agrega una unidad de un producto desde el catalogo (el :id es el del producto).
router.get('/carritos/agregar/:id', autorizacion(['Cliente']), carritoController.agregar);

// CRUD del carrito de compras. El identificador de la URL es el _id de MongoDB.
router.get('/carritos', autorizacion(['Cliente']), carritoController.consultar);
router.get('/carritos/:id', autorizacion(['Cliente']), carritoController.consultarId);
router.post('/carritos', autorizacion(['Cliente']), carritoController.registrar);
router.put('/carritos/:id', autorizacion(['Cliente']), carritoController.actualizar);
router.delete('/carritos/:id', autorizacion(['Cliente']), carritoController.eliminar);

module.exports = router;
