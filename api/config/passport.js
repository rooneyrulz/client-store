const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//Require User Model
let User = require('../models/user_schema');

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, 'User not found!');
            } else {
                //Check for Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, 'Invalid password!');
                    }
                })
            }
        })
    }));

    //Passport Serialization
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //Passport Deserialization
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};