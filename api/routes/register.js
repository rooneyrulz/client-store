const express = require('express');
const router = express.Router();

//Require Register Controller
let registerController = require('../controllers/register');

//Route for Rendering Register Page
router.get('/', registerController.RenderRegister);

//Route for Registering User
router.post('/', registerController.RegisterUser);


module.exports = router;