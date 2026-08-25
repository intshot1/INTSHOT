// Script de un solo uso: recorre los usuarios existentes y hashea los
// passwords que todavia esten en texto plano (de antes de la Fase 1).
//
// Uso:  node scripts/migrar-passwords.js
//
// Es seguro correrlo mas de una vez: los passwords que ya son un hash bcrypt
// (empiezan con "$2") se saltan y no se vuelven a hashear.

require('dotenv').config();
const Usuario = require('../src/models/usuario.model');

(async () => {
    try {
        // .lean() trae documentos planos (objetos JS simples), sin disparar
        // ningun hook de Mongoose todavia -- solo queremos leer, no escribir.
        const usuarios = await Usuario.find().lean();

        let migrados = 0;

        for (const u of usuarios) {
            const yaEsHash = typeof u.password === 'string' && u.password.startsWith('$2');

            if (yaEsHash) {
                continue;
            }

            // updateOne dispara el hook pre('updateOne') del modelo, que ya
            // sabe hashear el password -- reusamos esa misma logica en vez
            // de duplicarla aqui.
            await Usuario.updateOne({ _id: u._id }, { $set: { password: u.password } });
            migrados++;
        }

        console.log(`Listo. Migrados ${migrados} de ${usuarios.length} usuario(s).`);
        process.exit(0);
    } catch (error) {
        console.error('Error migrando passwords:', error);
        process.exit(1);
    }
})();
