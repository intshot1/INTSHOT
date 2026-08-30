const express = require('express');
const router = express.Router();
const detalleCompraController = require('../controllers/detalleCompra.controller');

// Formulario para agregar un producto a una compra.
router.get('/detalleCompras/formulario', detalleCompraController.formulario);

// CRUD de los detalles de compra. El identificador de la URL es el _id de MongoDB.
router.get('/detalleCompras', detalleCompraController.consultar);
router.get('/detalleCompras/:id', detalleCompraController.consultarId);
router.post('/detalleCompras', detalleCompraController.registrar);
router.put('/detalleCompras/:id', detalleCompraController.actualizar);
router.delete('/detalleCompras/:id', detalleCompraController.eliminar);

module.exports = router;
