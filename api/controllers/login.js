const passport = require('passport');

//Render Login Page
exports.RenderLogin = (req, res, next) => {
    res.status(200).render('login', { title: 'Login Your Profile' });
    console.log(`login page rendered!!`);
};

//Login User
exports.LoginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/nodeville/home',
        failureRedirect: '/user/login',
        failureFlash: true,
    })(req, res, next);
};

//Logout User
exports.Logout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out!');
    res.redirect('/user/login');
};