//Initialize Sidenav
let sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

//Initialize Slider
let Slider = document.querySelector('.slider');
M.Slider.init(Slider, {
    transition: 500,
    indicators: false,
    //height: 500,
    interval: 6000,
});

//Initialize Tooltip
let tooltipped = document.querySelector('.tooltipped');
M.Tooltip.init(tooltipped, {});