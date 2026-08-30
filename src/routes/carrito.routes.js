const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// Formulario para agregar manualmente una linea al carrito.
router.get('/carritos/formulario', carritoController.formulario);

// CRUD del carrito de compras. El identificador de la URL es el _id de MongoDB.
router.get('/carritos', carritoController.consultar);
router.get('/carritos/:id', carritoController.consultarId);
router.post('/carritos', carritoController.registrar);
router.put('/carritos/:id', carritoController.actualizar);
router.delete('/carritos/:id', carritoController.eliminar);

module.exports = router;
