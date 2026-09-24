const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const movimientoContableController = require('../controllers/movimientoContable.controller');

// Formulario para registrar un ingreso o egreso contable.
router.get('/movimientosContables/formulario', autorizacion(['Administrador']), movimientoContableController.formulario);

// CRUD de los movimientos contables. El identificador de la URL es el _id de MongoDB.
router.get('/movimientosContables', autorizacion(['Administrador']), movimientoContableController.consultar);
router.get('/movimientosContables/:id', autorizacion(['Administrador']), movimientoContableController.consultarId);
router.post('/movimientosContables', autorizacion(['Administrador']), movimientoContableController.registrar);
router.put('/movimientosContables/:id', autorizacion(['Administrador']), movimientoContableController.actualizar);
router.delete('/movimientosContables/:id', autorizacion(['Administrador']), movimientoContableController.eliminar);

module.exports = router;
