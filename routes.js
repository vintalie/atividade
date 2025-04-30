const express = require('express');
const router = express.Router();

const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const dashboardController = require('./controllers/dashboardController');


router.get('/', homeController.get)

router.get('/entrar', loginController.get)
router.post('/entrar', loginController.post)

router.get('/criar-conta', registerController.get)
router.post('/criar-conta', registerController.post)

router.get('/dashboard', dashboardController.get)
router.get('/dashboard', dashboardController.post)
// router.get('/musica', musicaController.get)
// router.get('/integrantes', integrantesController.get)

module.exports = router 