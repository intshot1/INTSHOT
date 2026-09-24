const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const proveedorController = require('../controllers/proveedor.controller');

// Formulario para registrar un proveedor nuevo.
router.get('/proveedores/formulario', autorizacion(['Administrador', 'Empleado']), proveedorController.formulario);

// CRUD de proveedores. El identificador de la URL es el correo.
router.get('/proveedores', autorizacion(['Administrador', 'Empleado']), proveedorController.consultar);
router.get('/proveedores/:id', autorizacion(['Administrador', 'Empleado']), proveedorController.consultarId);
router.post('/proveedores', autorizacion(['Administrador', 'Empleado']), proveedorController.registrar);
router.put('/proveedores/:id', autorizacion(['Administrador', 'Empleado']), proveedorController.actualizar);
router.delete('/proveedores/:id', autorizacion(['Administrador', 'Empleado']), proveedorController.eliminar);

module.exports = router;
