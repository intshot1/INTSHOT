const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const pedidoController = require('../controllers/pedido.controller');

// Formulario para registrar un pedido.
router.get('/pedidos/formulario', autorizacion(), pedidoController.formulario);

// CRUD de pedidos. El identificador de la URL es el _id de MongoDB.
router.get('/pedidos', autorizacion(), pedidoController.consultar);
router.get('/pedidos/:id', autorizacion(), pedidoController.consultarId);
router.post('/pedidos', autorizacion(), pedidoController.registrar);
router.put('/pedidos/:id', autorizacion(['Administrador', 'Empleado']), pedidoController.actualizar);
router.delete('/pedidos/:id', autorizacion(['Administrador', 'Empleado']), pedidoController.eliminar);

module.exports = router;
