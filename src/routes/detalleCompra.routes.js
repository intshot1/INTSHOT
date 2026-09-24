const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const detalleCompraController = require('../controllers/detalleCompra.controller');

// Formulario para agregar un producto a una compra.
router.get('/detalleCompras/formulario', autorizacion(['Administrador', 'Empleado']), detalleCompraController.formulario);

// CRUD de los detalles de compra. El identificador de la URL es el _id de MongoDB.
router.get('/detalleCompras', autorizacion(['Administrador', 'Empleado']), detalleCompraController.consultar);
router.get('/detalleCompras/:id', autorizacion(['Administrador', 'Empleado']), detalleCompraController.consultarId);
router.post('/detalleCompras', autorizacion(['Administrador', 'Empleado']), detalleCompraController.registrar);
router.put('/detalleCompras/:id', autorizacion(['Administrador', 'Empleado']), detalleCompraController.actualizar);
router.delete('/detalleCompras/:id', autorizacion(['Administrador', 'Empleado']), detalleCompraController.eliminar);

module.exports = router;
