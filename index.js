
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const routes = require('./routes')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'assets')))

app.use(routes)

app.listen(3020, () => {
    console.log('server iniciado na porta ' + 3020)
}) 