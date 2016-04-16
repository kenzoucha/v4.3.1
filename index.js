var express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser');

global.appRoot = path.resolve(__dirname);

var app = express();

var sess = {
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: new Date(Date.now() + 3600000)},
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    secret: 'addhe3ddzrf6eezefzefzefzefzefprr'
}

require('./api/db');

require('./api/back_office/auth/passport')(passport);
require('./api/front_office/auth/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session(sess));
app.use(express.static(path.join(__dirname,'public')));
app.use(passport.initialize());
app.use(passport.session());

var apiAdmin = require(appRoot + '/api/back_office/api');

var apiFront = require(appRoot + '/api/front_office/api');



app
    .use('/api/admin',apiAdmin)
    .get('/admin',function(req,res){
        res.sendFile(path.join(__dirname,'public/admin/index.html'));
    })
    .use('/api/front',apiFront)
    .get('/front',function(req,res){
        res.sendFile(path.join(__dirname,'public/front/index.html'));
    })
    .listen(3000);
