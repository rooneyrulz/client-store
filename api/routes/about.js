const express = require('express');
const router = express.Router();

//Require Home Controller
let aboutController = require('../controllers/about');

//Require Authentication
let ensureAthenticated = require('../authentications/auth');

router.get('/about', ensureAthenticated, aboutController.RenderAbout);


module.exports = router;