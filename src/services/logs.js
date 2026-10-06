const fs = require('fs');
const path = require('path');

// Carpeta donde viven los archivos de log de la aplicacion (logs/ esta en el
// .gitignore, igual que los logs de PM2). Se resuelve relativa a la raiz del
// proyecto para que el archivo quede siempre en el mismo sitio, sin importar
// desde donde se lance el proceso (npm start, nodemon, pm2...).
const CARPETA_LOGS = path.join(__dirname, '..', '..', 'logs');

// Arma la ruta completa del archivo dentro de la carpeta de logs.
const resolverRuta = (archivo) => path.join(CARPETA_LOGS, archivo);

// Crea la carpeta de logs si aun no existe: fs no la crea solo y sin ella
// cualquier escritura falla con ENOENT.
const asegurarCarpeta = () => fs.mkdirSync(CARPETA_LOGS, { recursive: true });

// Lee un archivo de log y devuelve su contenido completo como texto.
// Devuelve null si el archivo todavia no existe.
exports.leerArchivo = (archivo) => {
  const ruta = resolverRuta(archivo);

  if (!fs.existsSync(ruta)) {
    return null;
  }

  return fs.readFileSync(ruta, 'utf8');
}

// Escribe un archivo de log con el contenido indicado. Si el archivo ya
// existia se sobrescribe completo (para anadir lineas esta guardarLog).
exports.escribirArchivo = (archivo, contenido) => {
  asegurarCarpeta();
  fs.writeFileSync(resolverRuta(archivo), contenido, 'utf8');
}

// Borra un archivo de log. Devuelve true si se borro y false si no existia.
exports.borrarArchivo = (archivo) => {
  const ruta = resolverRuta(archivo);

  if (!fs.existsSync(ruta)) {
    return false;
  }

  fs.unlinkSync(ruta);
  return true;
}

// Devuelve los permisos del archivo: el modo en octal (ej. "644") y si el
// proceso puede leerlo, escribirlo o ejecutarlo.
exports.leerPermisos = (archivo) => {
  const ruta = resolverRuta(archivo);
  const modo = fs.statSync(ruta).mode & 0o777;

  return {
    archivo: archivo,
    ruta: ruta,
    modo: modo.toString(8).padStart(3, '0'),
    lectura: Boolean(modo & 0o400),
    escritura: Boolean(modo & 0o200),
    ejecucion: Boolean(modo & 0o100)
  };
}

// Anade una linea con fecha y hora al final del archivo indicado (lo crea si
// no existe). El mensaje lo arma quien llama: normalmente el controlador.
exports.guardarLog = (archivo, mensaje) => {
  try {
    asegurarCarpeta();

    const fecha = new Date().toLocaleString();
    fs.appendFileSync(resolverRuta(archivo), `[${fecha}] ${mensaje}\n`, 'utf8');
    return true;
  } catch (err) {
    // Nunca se relanza: un fallo al escribir el log no debe romper el
    // registro de producto, el login o el alta de usuario.
    console.error('Error al guardar el log:', err);
    return false;
  }
}
