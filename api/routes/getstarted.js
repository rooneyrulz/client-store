const express = require('express');
const router = express.Router();

//Require Started Controller
let startedController = require('../controllers/getstarted');

//Require Authentication
let ensureAuthenticated = require('../authentications/auth');

router.get('/home', ensureAuthenticated, startedController.RenderStarted);


module.exports = router;