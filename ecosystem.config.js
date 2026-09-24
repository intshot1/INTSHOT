// Configuracion de PM2 para INTSHOT.
//
// PM2 es un administrador de procesos para Node: deja la aplicacion corriendo
// en segundo plano (sin tener una terminal abierta), la vuelve a levantar sola
// si se cae por un error y, junto con "pm2 save" + el arranque de Windows,
// la inicia automaticamente al prender el computador.
//
// Comandos utiles (desde la carpeta del proyecto):
//   npm run pm2:start     -> inicia la app con esta configuracion
//   npm run pm2:restart   -> reinicia la app (por ejemplo despues de cambiar codigo)
//   npm run pm2:stop      -> detiene la app
//   npm run pm2:logs      -> muestra lo que imprime la app (console.log y errores)
//   pm2 list              -> muestra el estado de todas las apps
//   pm2 monit             -> monitor en vivo de CPU y memoria

module.exports = {
    apps: [
        {
            name: 'intshot',
            script: 'index.js',
            cwd: __dirname,

            // Una sola instancia es suficiente para este proyecto.
            instances: 1,
            exec_mode: 'fork',

            // Si la app se cae, PM2 la vuelve a levantar sola.
            autorestart: true,
            max_restarts: 10,
            restart_delay: 3000,

            // Si la app llega a usar mas de 300 MB de memoria, se reinicia.
            max_memory_restart: '300M',

            // No se reinicia al cambiar archivos (para eso esta "nodemon" en desarrollo).
            watch: false,

            // Archivos donde PM2 guarda lo que imprime la app.
            out_file: './logs/intshot-out.log',
            error_file: './logs/intshot-error.log',
            time: true,

            // Las demas variables (PORT, MONGODB_URI, JWT_SECRET...) se leen del .env
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
