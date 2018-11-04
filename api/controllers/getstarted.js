//Render Started Page
exports.RenderStarted = (req, res, next) => {
    res.status(200).render('getstarted', {});
    console.log(`started page rendered!!`);
};