var cors = require('cors');
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var logger = require('morgan');

app.set('port', 9000);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('./routes'));

app.use(function(req, res, next) {
    var err = new Error("Page not found!");
    err.status = 404;
    next(err);
});

// ERROR HANDLER
app.use(function errorHandler (err, req, res, next) {
    console.log(err);

    // next(parameter) is err from here

    if (err.status === 501) {
        res.status(501).send("Route not implemented");
        return;
    }

    res.status(err.status).send(err.message);
});

module.exports = app;
