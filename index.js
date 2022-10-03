require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');

const app = express();
const port = 8000;
const db = require('./config/databaseConnection');

// for connect-flash
const session = require('express-session');
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash-middleware');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    secret:process.env.SESSIONSECRET,
    saveUninitialized: true,
    resave: true
}));
  
app.use(flash());
app.use(flashMiddleware.setFlash);

// middleware for using scss
app.use(nodeSassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(bodyParser.urlencoded({extended: false}));

// setting up the static files
app.use(express.static('./assets'));

// setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/', require('./routes'));





app.listen(process.env.PORT || port, function(err){
    if(err){
        console.log('Error in connecting with the express server ', err);
        return;
    }
    console.log('Express server successfully connected with the port:', port);
    return;
});