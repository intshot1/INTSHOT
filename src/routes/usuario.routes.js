const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Pagina de inicio del panel (primera pantalla despues de iniciar sesion).
router.get('/inicio', usuarioController.home);

// Formulario para registrar un usuario desde el panel de administracion.
router.get('/usuarios/formulario', usuarioController.formulario);

// CRUD de usuarios. El identificador de la URL es el correo.
router.get('/usuarios', usuarioController.consultar);
router.get('/usuarios/:id', usuarioController.consultarId);
router.post('/usuarios', usuarioController.registrar);
router.put('/usuarios/:id', usuarioController.actualizar);
router.delete('/usuarios/:id', usuarioController.eliminar);

module.exports = router;
