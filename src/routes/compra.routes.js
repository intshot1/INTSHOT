const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compra.controller');

// Formulario para registrar una compra a un proveedor.
router.get('/compras/formulario', compraController.formulario);

// CRUD de compras. El identificador de la URL es el _id de MongoDB.
router.get('/compras', compraController.consultar);
router.get('/compras/:id', compraController.consultarId);
router.post('/compras', compraController.registrar);
router.put('/compras/:id', compraController.actualizar);
router.delete('/compras/:id', compraController.eliminar);

module.exports = router;
