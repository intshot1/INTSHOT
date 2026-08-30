const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pago.controller');

// Formulario para registrar el pago de un pedido.
router.get('/pagos/formulario', pagoController.formulario);

// CRUD de pagos. El identificador de la URL es el _id de MongoDB.
router.get('/pagos', pagoController.consultar);
router.get('/pagos/:id', pagoController.consultarId);
router.post('/pagos', pagoController.registrar);
router.put('/pagos/:id', pagoController.actualizar);
router.delete('/pagos/:id', pagoController.eliminar);

module.exports = router;
