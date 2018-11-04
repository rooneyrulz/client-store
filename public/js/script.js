$(document).ready(() => {
    let btn = $('.alert-close');
    btn.on('click', (e) => {
        //console.log(`Clicked!!`);
        $(e.target).parent().fadeOut(1000);
    });

    let alertFlash = $('.alert-flash');
    alertFlash.fadeOut(4000);
});