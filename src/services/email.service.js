const nodemailer = require('nodemailer');

/**
 * Servicio de envio de correos.
 *
 * Es un servicio (y no codigo suelto dentro de un controlador) para poder
 * reutilizarlo desde cualquier funcionalidad del proyecto: hoy lo usan el
 * registro de usuarios y el registro de pedidos, mañana puede usarlo el
 * cambio de estado de un pedido o la confirmacion de un pago.
 */

// El "transporter" es quien se conecta a Gmail y hace el envio real.
// La contraseña NO es la de la cuenta: es una "contraseña de aplicacion"
// de 16 caracteres que Gmail genera aparte, y va en el .env (nunca en el codigo).
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GPASS
    }
});

// Envia un correo. Recibe el destinatario, el asunto y el texto del mensaje.
exports.sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
    } catch (error) {
        // A proposito NO relanzamos el error: si Gmail falla, el registro o el
        // pedido ya quedaron guardados en la base de datos y no tiene sentido
        // mostrarle al usuario "error en el registro" por un correo que no salio.
        console.error('Error enviando correo:', error.message);
    }
};
