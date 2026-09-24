const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const compraController = require('../controllers/compra.controller');

// Formulario para registrar una compra a un proveedor.
router.get('/compras/formulario', autorizacion(['Administrador', 'Empleado']), compraController.formulario);

// CRUD de compras. El identificador de la URL es el _id de MongoDB.
router.get('/compras', autorizacion(['Administrador', 'Empleado']), compraController.consultar);
router.get('/compras/:id', autorizacion(['Administrador', 'Empleado']), compraController.consultarId);
router.post('/compras', autorizacion(['Administrador', 'Empleado']), compraController.registrar);
router.put('/compras/:id', autorizacion(['Administrador', 'Empleado']), compraController.actualizar);
router.delete('/compras/:id', autorizacion(['Administrador', 'Empleado']), compraController.eliminar);

module.exports = router;
