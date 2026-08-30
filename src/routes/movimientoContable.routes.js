const express = require('express');
const router = express.Router();
const movimientoContableController = require('../controllers/movimientoContable.controller');

// Formulario para registrar un ingreso o egreso contable.
router.get('/movimientosContables/formulario', movimientoContableController.formulario);

// CRUD de los movimientos contables. El identificador de la URL es el _id de MongoDB.
router.get('/movimientosContables', movimientoContableController.consultar);
router.get('/movimientosContables/:id', movimientoContableController.consultarId);
router.post('/movimientosContables', movimientoContableController.registrar);
router.put('/movimientosContables/:id', movimientoContableController.actualizar);
router.delete('/movimientosContables/:id', movimientoContableController.eliminar);

module.exports = router;
