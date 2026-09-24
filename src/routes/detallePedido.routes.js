const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const detallePedidoController = require('../controllers/detallePedido.controller');

// Formulario para agregar un producto a un pedido.
router.get('/detallePedidos/formulario', autorizacion(), detallePedidoController.formulario);

// CRUD de los detalles de pedido. El identificador de la URL es el _id de MongoDB.
router.get('/detallePedidos', autorizacion(), detallePedidoController.consultar);
router.get('/detallePedidos/:id', autorizacion(), detallePedidoController.consultarId);
router.post('/detallePedidos', autorizacion(), detallePedidoController.registrar);
router.put('/detallePedidos/:id', autorizacion(['Administrador', 'Empleado']), detallePedidoController.actualizar);
router.delete('/detallePedidos/:id', autorizacion(['Administrador', 'Empleado']), detallePedidoController.eliminar);

module.exports = router;
