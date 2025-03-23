const express = require('express');
const router = express.Router();

const homeController = require('./controllers/homeController')
const contatoController = require('./controllers/contatoController')
// const musicaController = require('./controllers/musicaController')
// const integrantesController = require('./controllers/integrantesController')

router.get('/', homeController.get)
router.get('/contato', contatoController.get)
// router.get('/musica', musicaController.get)
// router.get('/integrantes', integrantesController.get)

module.exports = router 