//Render About Page
exports.RenderAbout = (req, res, next) => {
    res.status(200).render('about', { title: 'About Us' });
    console.log(`about page rendered!!`);
};