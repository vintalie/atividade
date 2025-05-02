const express = require('express');
const router = express.Router();
const protected = require('./lib/protected.js')

const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const dashboardController = require('./controllers/dashboardController');
const emergenciesController = require('./controllers/emergenciesController');


router.get('/', homeController.get)

router.get('/entrar', loginController.get)
router.post('/entrar', loginController.post)
router.get('/logout', loginController.logout)

router.get('/criar-conta', registerController.get)
router.post('/criar-conta', registerController.post)

router.get('/dashboard', protected, dashboardController.get )

router.get('/dashboard/emergencias', protected, emergenciesController.get)
router.get('/dashboard/emergencia/:id', protected, emergenciesController.get)
router.get('/dashboard/emergencias', protected, emergenciesController.post)
router.get('/dashboard/emergencias', protected, emergenciesController.put)
router.get('/dashboard/emergencias', protected, emergenciesController.delete)
// router.get('/musica', musicaController.get)
// router.get('/integrantes', integrantesController.get)

module.exports = router 