const { exec } = require('child_process');
const fs = require('fs');
require('dotenv').config({ quiet: true });

const emailService = require('./email.service');

// Respaldo de la base de datos con mongodump (MongoDB Database Tools).
// Se usa --archive para que todo quede en UN solo archivo y se pueda adjuntar al correo.
// Para restaurarlo: mongorestore --uri "<MONGODB_URI>" --archive=<archivo> --gzip --drop
exports.backupDatabase = async () => {
    const outputPath = './backup';
    const archivo = `${outputPath}/intshot-${new Date().toISOString().slice(0, 10)}.gz`;

    // Si mongodump no esta en el PATH, su ruta completa va en MONGODUMP_PATH del .env
    const mongodump = process.env.MONGODUMP_PATH || 'mongodump';

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    const command = `"${mongodump}" --uri "${process.env.MONGODB_URI}" --archive="${archivo}" --gzip`;

    exec(command, async (error, stdout, stderr) => {
        if (error) {
            // No se imprime error.message porque trae la URI con la contraseña.
            console.error('Error en el respaldo. Revise mongodump y MONGODB_URI.');
            return;
        }
        console.log('Respaldo completado con exito:', archivo);

        await emailService.sendEmail(
            process.env.BACKUP_EMAIL || process.env.GMAIL_USER,
            'Respaldo base de datos INTSHOT',
            'Adjunto el respaldo automatico de la base de datos de INTSHOT.',
            [{ path: archivo }]
        );
    });
};
