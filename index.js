
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const routes = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(session({
    secret:"Bambole-tringular-do-hiper-espaço-sideral",
    resave:true,
    saveUninitialized:true,
}))
// Enable parsing of JSON request bodies
app.use(express.json());

// Enable parsing of URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'assets')))

app.use(routes)

app.listen(3020, () => {
    console.log('server iniciado na porta ' + 3020)
}) 