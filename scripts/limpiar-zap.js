// Borra los registros basura que dejo un escaneo de seguridad con OWASP ZAP
// (productos, usuarios y proveedores con valores como "ZAP", "ZAP AND 1=1 --",
// "http://www.google.com/search?q=ZAP", etc.).
//
// Uso (desde la carpeta del proyecto):
//   node scripts/limpiar-zap.js           -> solo MUESTRA lo que se borraria
//   node scripts/limpiar-zap.js --borrar  -> guarda un respaldo en scripts/respaldo-zap.json y BORRA
//
// Un registro se considera basura si "zap" aparece en cualquiera de sus campos.

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env'), quiet: true });
const mongoose = require('../src/config/connectiondb');

const COLECCIONES = ['productos', 'usuarios', 'proveedors'];
const borrar = process.argv.includes('--borrar');

(async () => {
    await mongoose.connection.asPromise();
    const db = mongoose.connection.db;
    const respaldo = {};

    for (const nombre of COLECCIONES) {
        const coleccion = db.collection(nombre);
        const documentos = await coleccion.find().toArray();
        const basura = documentos.filter((doc) => /zap/i.test(JSON.stringify(doc)));

        console.log(`\n${nombre}: ${documentos.length} en total, ${basura.length} de ZAP`);
        console.log('  Se conservan:');
        documentos
            .filter((doc) => !basura.includes(doc))
            .forEach((doc) => console.log(`    - ${doc.nombre} ${doc.apellido || ''} (${doc.correo || doc.categoria || ''})`));

        respaldo[nombre] = basura;

        if (borrar && basura.length > 0) {
            const resultado = await coleccion.deleteMany({ _id: { $in: basura.map((doc) => doc._id) } });
            console.log(`  Borrados: ${resultado.deletedCount}`);
        }
    }

    if (borrar) {
        const archivo = path.join(__dirname, 'respaldo-zap.json');
        fs.writeFileSync(archivo, JSON.stringify(respaldo, null, 1));
        console.log(`\nRespaldo guardado en ${archivo}`);
    } else {
        console.log('\nNo se borro nada. Para borrar ejecuta: node scripts/limpiar-zap.js --borrar');
    }

    process.exit(0);
})();
