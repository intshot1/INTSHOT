const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// Catalogo publico de productos, pensado para el cliente que va a comprar.
router.get('/catalogo', productoController.catalogo);

// Formulario para registrar un producto nuevo.
router.get('/productos/formulario', productoController.formulario);

// CRUD de productos. El identificador de la URL es el nombre del producto.
router.get('/productos', productoController.consultar);
router.get('/productos/:id', productoController.consultarId);
router.post('/productos', productoController.registrar);
router.put('/productos/:id', productoController.actualizar);
router.delete('/productos/:id', productoController.eliminar);

module.exports = router;
