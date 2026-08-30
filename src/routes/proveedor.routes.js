const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');

// Formulario para registrar un proveedor nuevo.
router.get('/proveedores/formulario', proveedorController.formulario);

// CRUD de proveedores. El identificador de la URL es el correo.
router.get('/proveedores', proveedorController.consultar);
router.get('/proveedores/:id', proveedorController.consultarId);
router.post('/proveedores', proveedorController.registrar);
router.put('/proveedores/:id', proveedorController.actualizar);
router.delete('/proveedores/:id', proveedorController.eliminar);

module.exports = router;
