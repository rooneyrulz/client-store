const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Require User Schema
const User = require('../models/user_schema');

//Render Register Page
exports.RenderRegister = (req, res, next) => {
    res.status(200).render('register', { title: 'Create Profile' });
    console.log(`register page rendered!!`);
};

//Register User
exports.RegisterUser = (req, res, next) => {
    //Check for Validation Errors
    req.checkBody('fname', 'First name is required!').notEmpty();
    req.checkBody('lname', 'Last name is required!').notEmpty();
    req.checkBody('profilename', 'Profile name is required!').notEmpty();
    req.checkBody('email', 'Email is not valid!').isEmail();
    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password2', 'Password is not match!').equals(req.body.password);

    let validationErrors = req.validationErrors();
    if (validationErrors) {
        res.render('register', { errors: validationErrors, title: 'Create Profile' });
        console.log(validationErrors);
    } else {
        //Check for Duplicate Email
        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    req.flash('error_msg', 'Invalid email found!');
                    res.redirect('/user/register');
                    console.log(`duplicate email id..!!`);
                } else {
                    //Check for Duplicate Username
                    User.find({ username: req.body.username })
                        .exec()
                        .then(user => {
                            if (user.length >= 1) {
                                req.flash('error_msg', 'Invalid username found!');
                                res.redirect('/user/register');
                                console.log(`duplicate username..!!`);
                            } else {
                                User.find({ profile_name: req.body.profilename })
                                    .exec()
                                    .then(user => {
                                        if (user.length >= 1) {
                                            req.flash('error_msg', 'Profile name is already in use, Change your profile name!');
                                            res.redirect('/user/register');
                                            console.log(`duplicate profile name..!!`);
                                        } else {
                                            bcrypt.genSalt(10, (err, salt) => {
                                                if (err) {
                                                    res.status(500).render('error', { error: err, title: 'Server Error!' });
                                                    console.log(`Error: ${err.message}`);
                                                } else {
                                                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                                                        if (err) {
                                                            res.status(500).render('error', { error: err, title: 'Server Error!' });
                                                            console.log(`Error: ${err.message}`);
                                                        } else {
                                                            //Save Users
                                                            let user = new User({
                                                                _id: new mongoose.Types.ObjectId(),
                                                                first_name: req.body.fname,
                                                                last_name: req.body.lname,
                                                                profile_name: req.body.profilename,
                                                                email: req.body.email,
                                                                username: req.body.username,
                                                                password: hash
                                                            });
                                                            return user
                                                                .save()
                                                                .then(user => {
                                                                    req.flash('success_msg', 'Profile successfullt Created, Now you can visit your profile!');
                                                                    res.redirect('/user/login');
                                                                    console.log(user);
                                                                })
                                                                .catch(err => {
                                                                    res.status(500).render('error', { error: err, title: 'Server Error!' });
                                                                    console.log(`Error: ${err.message}`);
                                                                });
                                                        }
                                                    })
                                                }
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