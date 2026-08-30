const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');

// Formulario para registrar un pedido.
router.get('/pedidos/formulario', pedidoController.formulario);

// CRUD de pedidos. El identificador de la URL es el _id de MongoDB.
router.get('/pedidos', pedidoController.consultar);
router.get('/pedidos/:id', pedidoController.consultarId);
router.post('/pedidos', pedidoController.registrar);
router.put('/pedidos/:id', pedidoController.actualizar);
router.delete('/pedidos/:id', pedidoController.eliminar);

module.exports = router;
