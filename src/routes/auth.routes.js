const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Pagina de aterrizaje publica.
router.get('/', authController.landing);

// Formulario de inicio de sesion.
router.get('/login', authController.mostrarLogin);
router.post('/login', authController.login);

// Formulario de registro publico.
router.get('/registro', authController.mostrarRegistro);
router.post('/registro', authController.registro);

module.exports = router;
