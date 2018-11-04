const express = require('express');
const path = require('path');
const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const messages = require('express-messages');
const validator = require('express-validator');
const passport = require('passport');

const app = express();

//Require Database Connection
let DBConnection = require('./api/config/database');

//Set HTTP Logger Morgan Middleware
app.use(morgan('dev'));

//Set Tamplate Engine Middleware
app.set('views', path.resolve(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

//Setup Body-Parser Middleware and Cookie-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Setup Public Folder
app.use(express.static(path.resolve(__dirname, 'node_modules')));
app.use(express.static(path.resolve(__dirname, 'public')));

//Express Session Middleware
app.use(session({
    secret: 'your secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//Express Flash Middleware
app.use(flash());

//Express Messages Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Express Validator Middleware
app.use(validator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Require Passport
require('./api/config/passport')(passport);

//Passport Middlewares Initialization & Session
app.use(passport.initialize());
app.use(passport.session());

//Setup Local Variable for User
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
    //console.log(res.locals.user);
});

//Route for Home
const homeRoute = require('./api/routes/home');
app.use('/home', homeRoute);

//Route for Register
const registerRoute = require('./api/routes/register');
app.use('/user/register', registerRoute);

//Route for Login
const loginRoute = require('./api/routes/login');
app.use('/user', loginRoute);

//Route for Getstarted 
const getstartedRoute = require('./api/routes/getstarted');
app.use('/nodeville', getstartedRoute);

//Route for Client
const addClientRoute = require('./api/routes/client');
app.use('/nodeville', addClientRoute)

//Route for About
const aboutRoute = require('./api/routes/about');
app.use('/nodeville', aboutRoute);

//Set a Port
app.set('port', (process.env.PORT || 3000));
//Listen
app.listen(app.get('port'), () => console.log(`server started running on the port ${app.get('port')}!!`));