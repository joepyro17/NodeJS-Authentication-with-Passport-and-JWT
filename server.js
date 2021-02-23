const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const db = require('./app/config/database');
require('./app/auth/auth');
const router = require('./app/routers/route');
const securedRouter = require('./app/routers/securedRoute');

const app = express();

// Create a connection with MongoDB
db.createConnection();

// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser());
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));
// Routing
// Secured Routes
app.use('/api', passport.authenticate('jwt', { session: false }), securedRouter);
// Authentication
app.use('/auth', router);


module.exports = app;
