//Render Home Page
exports.RenderHome = (req, res, next) => {
    res.render('home', { title: 'Home Page'});
    console.log(`home page rendered!!`);
};