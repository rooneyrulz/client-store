const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'Please login!');
        res.redirect('/user/login');
        console.log(`authentication failed!!`);
    }
};

module.exports = ensureAuthenticated;