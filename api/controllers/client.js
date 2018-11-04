const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Require Client Model
let Client = require('../models/client_schema');

//Render Addclient Page
exports.RenderAddClient = (req, res, next) => {
    res.status(200).render('addclient', { title: 'Add Clients' });
    console.log(`addclient page rendered!!`);
};

//Save Clients
exports.SaveClient = (req, res, next) => {
    //Check for Errors
    req.checkBody('fname', 'First name is required!').notEmpty();
    req.checkBody('lname', 'Last name is required!').notEmpty();
    req.checkBody('email', 'Invalid email id!').isEmail();
    req.checkBody('age', 'Invalid age!').isInt();
    req.checkBody('gender', 'Gender is required!').notEmpty();
    req.checkBody('contact', 'Invalid contact number!').isNumeric();
    req.checkBody('creditcard', 'Invalid credit card number!').isNumeric();
    req.checkBody('postalcode', 'Invalid postal card number!').isNumeric();
    req.checkBody('country', 'Country is required!').notEmpty();
    req.checkBody('message', 'leave some message about you!').notEmpty();

    let validationErrors = req.validationErrors();
    if (validationErrors) {
        res.render('addclient', { errors: validationErrors, title: 'Add Clients' });
    } else {
        Client.find({email: req.body.email})
        .exec()
        .then(client => {
            if (client.length >= 1) {
                req.flash('error_msg', 'Invalid email id!');
                res.redirect('/nodeville/add.client');
                console.log(`duplicate email id!!`);
            }
            else {
                Client.find({contact_number: req.body.contact})
                .exec()
                .then(client => {
                    if (client.length >= 1) {
                        req.flash('error_msg', 'Invalid contact number!');
                        res.redirect('/nodeville/add.client');
                        console.log(`duplicate contact number!!`);
                    }
                    else {
                        Client.find({creditcard_number: req.body.creditcard})
                        .exec()
                        .then(client => {
                            if (client.length >= 1) {
                                req.flash('error_msg', 'Invalid credit card id!');
                                res.redirect('/nodeville/add.client');
                                console.log(`duplicate credit card number!!`);
                            }
                            else {
                                Client.find({postal_code: req.body.postalcode})
                                .exec()
                                .then(client => {
                                    if (client.length >= 1) {
                                        req.flash('error_msg', 'Invalid postal code!');
                                        res.redirect('/nodeville/add.client');
                                        console.log(`duplicate postal code!!`);
                                    }
                                    else {
                                        if (req.body.age > 45 || req.body.age < 20) {
                                            req.flash('error_msg', 'Age must be between 19 and 46 years!');
                                            res.redirect('/nodeville/add.client');
                                            console.log(`age must be between 19 and 46 years!!`);
                                        } else {
                                            if (req.body.gender === "Male" || req.body.gender === "Female") {
                                                //Save Clients

                                                let client = new Client({
                                                    _id: new mongoose.Types.ObjectId(),
                                                    first_name: req.body.fname,
                                                    last_name: req.body.lname,
                                                    email: req.body.email,
                                                    age: req.body.age,
                                                    gender: req.body.gender,
                                                    contact_number: req.body.contact,
                                                    creditcard_number: req.body.creditcard,
                                                    postal_code: req.body.postalcode,
                                                    country: req.body.country,
                                                    message: req.body.message,
                                                    employee_id: req.user._id
                                                });
                                                return client
                                                .save()
                                                .then(client => {
                                                    req.flash('success_msg', 'Client successfully saved!');
                                                    res.redirect('/nodeville/add.client');
                                                    console.log(client);
                                                })
                                                .catch(err => {
                                                    res.status(500).render('error', { error: err, title: 'Server Error!' });
                                                    console.log(`Error: ${err.message}`);
                                                });
                                            } else {
                                                req.flash('error_msg', 'Invalid gender info!');
                                                res.redirect('/nodeville/add.client');
                                                console.log(`invalid gender info!!`);
                                            }
                                        }
                                    }
                                })
                                .catch(err => {
                                    res.status(500).render('error', { error: err, title: 'Server Error!' });
                                    console.log(`Error: ${err.message}`);
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).render('error', { error: err, title: 'Server Error!' });
                            console.log(`Error: ${err.message}`);
                        });
                    }
                })
                .catch(err => {
                    res.status(500).render('error', { error: err, title: 'Server Error!' });
                    console.log(`Error: ${err.message}`);
                });
            }
        })
        .catch(err => {
            res.status(500).render('error', { error: err, title: 'Server Error!' });
            console.log(`Error: ${err.message}`);
        });
    }
};

//Get AllClients Page 
exports.GetAllClients = (req, res, next) => {
    Client.find({employee_id: req.user._id})
    .select('_id first_name last_name email country')
    .exec()
    .then(clients => {
        if (clients.length < 1) {
            res.status(404).render('error', { error: 'No client found, Add some clients and try again!', title: 'Not Found!' });
            console.log(`no client found!`);
        }
        else {
            res.status(200).render('allclients', { title: 'All Clients', clients: clients });
            console.log(`all clients: ${clients}`);
        }
    })
    .catch(err => {
        res.status(500).render('error', { error: err, title: 'Server Error!' });
        console.log(`Error: ${err.message}`);
    });
};

//Get Client By Id
exports.GetClientById = (req, res, next) => {
    const clientId = req.params.id;
    Client.findById({_id: clientId})
    .select('_id first_name last_name email age gender contact_number creditcard_number postal_code country message')
    .exec()
    .then(client => {
        if (client.length < 1) {
            res.status(404).render('error', { error: 'No client found, Add some clients and try again!', title: 'Not Found!' });
            console.log(`no client found!`);
        }
        else {
            res.status(200).render('client', { client: client, title: `${client.first_name} ${client.last_name}` });
            console.log(client);
        }
    })
    .catch(err => {
        res.status(500).render('error', { error: err, title: 'Server Error!' });
        console.log(`Error: ${err.message}`);
    });
};

//Render Edit page
exports.RenderEditPage = (req, res, next) => {
    const clientId = req.params.id;
    Client.findById({_id: clientId})
    .select('_id first_name last_name email age gender contact_number creditcard_number postal_code country message')
    .exec()
    .then(client => {
        if (client.length < 1) {
            res.status(404).render('error', { error: 'No client found, Add some clients and try again!', title: 'Not Found!' });
            console.log(`no client found!`);
        }
        else {
            res.status(200).render('editclient', { client: client, title: 'Update Client Info' });
            console.log(`edit page rendered!!`);
        }
    })
    .catch(err => {
        res.status(500).render('error', { error: err, title: 'Server Error!' });
        console.log(`Error: ${err.message}`);
    });
};

//Patch Clients
exports.PatchClient = (req, res, next) => {
    const clientId = req.params.id;
    Client.findById({_id: clientId})
    .exec()
    .then(client => {
        if (client.length < 1) {
            res.status(404).render('error', { error: 'No client found, Add some clients and try again!', title: 'Not Found!' });
            console.log(`no client found!`);
        }
        else {
            let client = {
                first_name: req.body.fname,
                last_name: req.body.lname,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                contact_number: req.body.contact,
                creditcard_number: req.body.creditcard,
                postal_code: req.body.postalcode,
                country: req.body.country,
                message: req.body.message
            };
            Client.findByIdAndUpdate({_id: clientId}, {$set: client})
            .exec()
            .then(client => {
                req.flash('success_msg', 'Client info successfully updated!');
                res.redirect('/nodeville/get.allclients');
                console.log(`client updated!!`);
            })
            .catch(err => {
                res.status(500).render('error', { error: err, title: 'Server Error!' });
                console.log(`Error: ${err.message}`);
            });
        }
    })
    .catch(err => {
        res.status(500).render('error', { error: err, title: 'Server Error!' });
        console.log(`Error: ${err.message}`);
    });
};


//Delete Clients
exports.DeleteClient = (req, res, next) => {
    const clientId = req.params.id;
    Client.findById({_id: clientId})
    .exec()
    .then(client => {
        if (client.length < 1) {
            res.status(404).render('error', { error: 'No client found, Add some clients and try again!', title: 'Not Found!' });
            console.log(`no client found!`);
        }
        else {
            Client.remove({_id: clientId})
            .exec()
            .then(client => {
                req.flash('success_msg', 'Client successfully deleted!');
                res.send(client);
                console.log(`deleted: ${client}`);
            })
            .catch(err => {
                res.status(500).render('error', { error: err, title: 'Server Error!' });
                console.log(`Error: ${err.message}`);
            });
        }
    })
    .catch(err => {
        res.status(500).render('error', { error: err, title: 'Server Error!' });
        console.log(`Error: ${err.message}`);
    });
};