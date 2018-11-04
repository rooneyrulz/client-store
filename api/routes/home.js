const express = require('express');
const router = express.Router();

//Require Home Controller
let homeController = require('../controllers/home');

router.get('/', homeController.RenderHome);


module.exports = router;