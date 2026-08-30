// Script de prueba: manda un correo de ejemplo para comprobar que las
// credenciales de Gmail del .env (GMAIL_USER y GPASS) estan bien puestas,
// sin tener que registrar un usuario ni crear un pedido de verdad.
//
// Uso:  node scripts/probar-correo.js correo-destino@ejemplo.com
//
// Si no se pasa un destinatario, se manda el correo a la misma cuenta
// configurada en GMAIL_USER.

require('dotenv').config();
const emailService = require('../src/services/email.service');

(async () => {
    const destino = process.argv[2] || process.env.GMAIL_USER;

    if (!process.env.GMAIL_USER || !process.env.GPASS) {
        console.error('Falta GMAIL_USER o GPASS en el archivo .env');
        process.exit(1);
    }

    console.log('Enviando correo de prueba a:', destino);

    await emailService.sendEmail(
        destino,
        'Prueba de correo desde INTSHOT',
        'Si estas leyendo esto, el servicio de correo de INTSHOT quedo funcionando.'
    );

    process.exit(0);
})();
