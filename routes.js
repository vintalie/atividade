const express = require('express');
const router = express.Router();
const protected = require('./lib/protected.js')

const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const dashboardController = require('./controllers/dashboardController');
const emergenciesController = require('./controllers/emergenciesController');
const petsController = require('./controllers/petsController/index.js');


router.get('/', homeController.get)

router.get('/entrar', loginController.get)
router.post('/entrar', loginController.post)
router.get('/logout', loginController.logout)

router.get('/criar-conta', registerController.get)
router.post('/criar-conta', registerController.post)

router.get('/dashboard', protected, dashboardController.get )

router.get('/dashboard/emergencias', protected, emergenciesController.get)
router.get('/dashboard/emergencia/:id', protected, emergenciesController.get)
router.post('/dashboard/emergencias', protected, emergenciesController.post)
router.put('/dashboard/emergencias', protected, emergenciesController.put)
router.delete('/dashboard/emergencias', protected, emergenciesController.delete)

router.get('/dashboard/pets', protected, petsController.get)
router.post('/dashboard/pets', protected, petsController.post)

// router.get('/musica', musicaController.get)
// router.get('/integrantes', integrantesController.get)

module.exports = router 