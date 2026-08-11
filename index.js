const express = require('express');
const app = express();

require('./src/config/connectiondb');

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('INTSHOT funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});