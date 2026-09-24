const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const pagoController = require('../controllers/pago.controller');

// Formulario para registrar el pago de un pedido.
router.get('/pagos/formulario', autorizacion(), pagoController.formulario);

// CRUD de pagos. El identificador de la URL es el _id de MongoDB.
router.get('/pagos', autorizacion(['Administrador', 'Empleado']), pagoController.consultar);
router.get('/pagos/:id', autorizacion(['Administrador', 'Empleado']), pagoController.consultarId);
router.post('/pagos', autorizacion(), pagoController.registrar);
router.put('/pagos/:id', autorizacion(['Administrador', 'Empleado']), pagoController.actualizar);
router.delete('/pagos/:id', autorizacion(['Administrador', 'Empleado']), pagoController.eliminar);

module.exports = router;
