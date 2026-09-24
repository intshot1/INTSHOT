const express = require('express');
const router = express.Router();
const { autorizacion } = require('../middlewares/auth.middleware');
const usuarioController = require('../controllers/usuario.controller');

// Pagina de inicio del panel (primera pantalla despues de iniciar sesion).
router.get('/inicio', autorizacion(), usuarioController.home);

// Formulario para registrar un usuario desde el panel de administracion.
router.get('/usuarios/formulario', autorizacion(['Administrador']), usuarioController.formulario);

// CRUD de usuarios. El identificador de la URL es el correo.
router.get('/usuarios', autorizacion(['Administrador']), usuarioController.consultar);
router.get('/usuarios/:id', autorizacion(['Administrador']), usuarioController.consultarId);
router.post('/usuarios', autorizacion(['Administrador']), usuarioController.registrar);
router.put('/usuarios/:id', autorizacion(['Administrador']), usuarioController.actualizar);
router.delete('/usuarios/:id', autorizacion(['Administrador']), usuarioController.eliminar);

module.exports = router;
