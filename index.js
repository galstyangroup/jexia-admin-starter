const express = require('express');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');

// const requireOrg = require('./middlewares/requireOrg')
require('./services/passport.js');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
*/
dotenv.config({ path: '.env' });

const app = express();

app.use(compression()); //Compress all routes
app.use(helmet()); //secure

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: [process.env.COOKIE_KEY], resave: true, saveUninitialized: true }));

//handeling auth en session of passportjs 
app.use(passport.initialize());
app.use(passport.session());


// Application routes
require('./routes/authRoutes')(app);

const DIST_DIR = __dirname + '/dist';
    const HTML_FILE = path.join(DIST_DIR, '/src/dist/index.html');
    app.use(express.static(DIST_DIR));
    app.get('/', (req, res) => {
        res.sendFile(HTML_FILE);
    });
// error handler middleware
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json(err)
});

module.exports = app;