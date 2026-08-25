require('dotenv').config();

const path = require('path');
const express = require('express');
const methodOverride = require('method-override');

const app = express();

// Conexion a MongoDB (se ejecuta al requerir el archivo).
require('./src/config/connectiondb');

// Motor de plantillas: le dice a Express que use EJS y donde estan las vistas.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Sirve archivos estaticos (css, js, imagenes) desde /public en la raiz de las URLs.
app.use(express.static(path.join(__dirname, 'public')));

// Permite leer los datos que envian los formularios HTML (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Permite simular PUT/DELETE desde formularios HTML, que solo soportan GET/POST.
app.use(methodOverride('_method'));

// Rutas de autenticacion (landing, login, registro).
app.use('/', require('./src/routes/auth.routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
