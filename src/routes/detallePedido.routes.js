const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedido.controller');

// Formulario para agregar un producto a un pedido.
router.get('/detallePedidos/formulario', detallePedidoController.formulario);

// CRUD de los detalles de pedido. El identificador de la URL es el _id de MongoDB.
router.get('/detallePedidos', detallePedidoController.consultar);
router.get('/detallePedidos/:id', detallePedidoController.consultarId);
router.post('/detallePedidos', detallePedidoController.registrar);
router.put('/detallePedidos/:id', detallePedidoController.actualizar);
router.delete('/detallePedidos/:id', detallePedidoController.eliminar);

module.exports = router;
