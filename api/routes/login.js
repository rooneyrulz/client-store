const express = require('express');
const router = express.Router();

//Require Login Controller
let loginController = require('../controllers/login');

//Render Login Page
router.get('/login', loginController.RenderLogin);

//Route for Login Users
router.post('/login', loginController.LoginUser);

//Route for Logout
router.get('/logout', loginController.Logout);


module.exports = router;