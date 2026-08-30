const express = require('express');
const router = express.Router();
const movimientoInventarioController = require('../controllers/movimientoInventario.controller');

// Formulario para registrar una entrada o salida de inventario.
router.get('/movimientosInventario/formulario', movimientoInventarioController.formulario);

// CRUD de los movimientos de inventario. El identificador de la URL es el _id de MongoDB.
router.get('/movimientosInventario', movimientoInventarioController.consultar);
router.get('/movimientosInventario/:id', movimientoInventarioController.consultarId);
router.post('/movimientosInventario', movimientoInventarioController.registrar);
router.put('/movimientosInventario/:id', movimientoInventarioController.actualizar);
router.delete('/movimientosInventario/:id', movimientoInventarioController.eliminar);

module.exports = router;
