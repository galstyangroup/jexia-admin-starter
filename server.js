const express = require('express');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const http = require('http');
const jexia = require('jexia-sdk-js/node')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.config({ path: '.env' });

const credentials = {
    projectID: process.env.JEXIA_PROJECT_ID,
    key: process.env.JEXIA_KEY,
    secret: process.env.JEXIA_SECRET,
};

const app = express();

app.use(compression()); //Compress all routes
app.use(helmet()); //secure

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({
    extended: true
}));


// Application routes
app.post('/api/signup', async (req, res, next) => {
    const ums = new jexia.UMSModule();
    jexia.jexiaClient().init(credentials, ums);

    const user = await ums.signUp({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        lang: req.body.lang,
        curr_org: null,
        browser: req.body.browser
    }).catch(err => {
        res.status(400).json(err.message)
    });
    res.json(user)
});

app.post('/api/login', async (req, res, next) => {
    const ums = new jexia.UMSModule();
    jexia.jexiaClient().init(credentials, ums);
    const user = ums.signIn({
        email: req.body.email,
        password: req.body.password
    });
    res.json(user)
});

app.get('/api/current_user', async (req, res) => {
    const ums = new jexia.UMSModule();
    jexia.jexiaClient().init(credentials, ums);
    const user = await ums.getUser();
    res.json(user);
});


//distribute files form frontend
const DIST_DIR = __dirname + '/dist';
const HTML_FILE = path.join(DIST_DIR, '/src/dist/index.html');
app.use(express.static(DIST_DIR));
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

// error handler middleware
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json(err)
});

const PORT = process.env.PORT || 7050;

if (process.env.NODE_ENV === 'production') {
    http.createServer(app).listen(process.env.PORT, () => console.log(`Jexia-admin-starter listening on port ${PORT}!`));
} else {
    app.listen(PORT, () => console.log(`Jexia-admin-starter is listening on port ${PORT}!`));
}
