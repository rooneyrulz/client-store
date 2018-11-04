const express = require('express');
const router = express.Router();

//Require AddClient Controller
let clientController = require('../controllers/client');

//Require Authentication
let ensureAuthenticated = require('../authentications/auth');

//Render AddClients Page
router.get('/add.client', ensureAuthenticated, clientController.RenderAddClient);

//Route for Saving Clients
router.post('/add.client', ensureAuthenticated, clientController.SaveClient);

//Route for Rendering AllClinets Page
router.get('/get.allclients', ensureAuthenticated, clientController.GetAllClients);

//Route for Getting Client By Id
router.get('/get.client/:id', ensureAuthenticated, clientController.GetClientById);

//Route for Rendering Edit Page
router.get('/edit.client/:id', ensureAuthenticated, clientController.RenderEditPage);

//Route for Patching Clients
router.post('/edit.client/:id', ensureAuthenticated, clientController.PatchClient);

//Route for Deleting Clients
router.delete('/delete.client/:id', ensureAuthenticated, clientController.DeleteClient);

module.exports = router;