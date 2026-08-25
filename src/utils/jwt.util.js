const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const EXPIRA_EN = process.env.JWT_EXPIRES_IN || '2h';

if (!SECRET) {
    // Aviso temprano y claro. Sin esto, jwt.sign() igual falla, pero con un
    // error interno de la libreria menos obvio de diagnosticar.
    console.warn('[jwt.util] JWT_SECRET no esta definido en las variables de entorno.');
}

// Genera un JWT firmado a partir de un documento Usuario de Mongoose.
// El payload NUNCA debe incluir el password, ni siquiera el hash: un JWT
// no esta encriptado, solo firmado -- cualquiera puede decodificar y leer
// su contenido (por ejemplo en jwt.io), solo que no puede alterarlo sin
// invalidar la firma.
//
// Devuelve { token, expira } -- "expira" es un Date, util para configurar
// el "expires" de la cookie sin duplicar la duracion en dos lugares.
function generarToken(usuario) {
    const payload = {
        id: usuario._id,
        correo: usuario.correo,
        rol: usuario.rol,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRA_EN });
    const { exp } = jwt.decode(token);

    return { token, expira: new Date(exp * 1000) };
}

// Verifica un JWT y devuelve su payload decodificado si es valido.
// Si el token es invalido o expiro, jwt.verify lanza un error
// (TokenExpiredError, JsonWebTokenError, etc.) -- quien llame a esta
// funcion debe envolverla en try/catch (lo haremos en la Fase 3).
function verificarToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = { generarToken, verificarToken };
