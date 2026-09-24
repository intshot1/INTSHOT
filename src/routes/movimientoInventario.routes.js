const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const movimientoInventarioController = require('../controllers/movimientoInventario.controller');

// Formulario para registrar una entrada o salida de inventario.
router.get('/movimientosInventario/formulario', autorizacion(['Administrador', 'Empleado']), movimientoInventarioController.formulario);

// CRUD de los movimientos de inventario. El identificador de la URL es el _id de MongoDB.
router.get('/movimientosInventario', autorizacion(['Administrador', 'Empleado']), movimientoInventarioController.consultar);
router.get('/movimientosInventario/:id', autorizacion(['Administrador', 'Empleado']), movimientoInventarioController.consultarId);
router.post('/movimientosInventario', autorizacion(['Administrador', 'Empleado']), movimientoInventarioController.registrar);
router.put('/movimientosInventario/:id', autorizacion(['Administrador', 'Empleado']), movimientoInventarioController.actualizar);
router.delete('/movimientosInventario/:id', autorizacion(['Administrador', 'Empleado']), movimientoInventarioController.eliminar);

module.exports = router;
