const { verificarToken } = require('../utils/jwt.util');

// Middleware de autenticacion y roles.
//
// Es la version en Node del decorador @autorizacion(roles) del proyecto en
// Django: se pone delante de cada ruta que necesita sesion.
//
//   router.get('/usuarios', autorizacion(['Administrador']), usuarioController.consultar);
//   router.get('/inicio', autorizacion(), usuarioController.home);   // cualquier rol
//
// - Si no hay sesion (no hay cookie o el token vencio) -> manda al login.
// - Si hay sesion pero el rol no esta en la lista      -> vuelve al inicio con un aviso.
// - Si todo esta bien, deja los datos del usuario en req.usuario y en
//   res.locals.usuario para poder usarlos en los controladores y en las vistas.

// Lee una cookie puntual del encabezado "Cookie" de la peticion.
// El navegador la manda asi: "token=abc123; otra=valor".
function leerCookie(req, nombre) {
    const cookies = req.headers.cookie ? req.headers.cookie.split(';') : [];

    for (const cookie of cookies) {
        const [clave, ...valor] = cookie.trim().split('=');
        if (clave === nombre) {
            return decodeURIComponent(valor.join('='));
        }
    }
    return null;
}

// Devuelve los datos del usuario logueado, o null si no hay sesion valida.
function usuarioLogueado(req) {
    const token = leerCookie(req, 'token');
    if (!token) {
        return null;
    }

    try {
        return verificarToken(token);
    } catch (error) {
        return null;
    }
}

function autorizacion(roles = []) {
    return (req, res, next) => {
        const usuario = usuarioLogueado(req);

        if (!usuario) {
            res.clearCookie('token');
            return res.redirect('/login');
        }

        // Los tokens creados antes de agregar el nombre al payload no lo traen.
        usuario.nombre = usuario.nombre || usuario.correo;

        req.usuario = usuario;
        res.locals.usuario = usuario;

        if (roles.length > 0 && !roles.includes(usuario.rol)) {
            return res.render('pages/inicio', { mensaje: "No tienes permiso para este módulo" });
        }

        next();
    };
}

module.exports = { autorizacion, usuarioLogueado };
