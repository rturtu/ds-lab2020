var Middleware = require('../middlewares');
var Controller = require('../controllers');
var express = require('express');
var router = module.exports = express.Router();

router.get('/examples', Controller.example.getAll);
