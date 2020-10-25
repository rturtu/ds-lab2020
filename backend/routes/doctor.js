var Middleware = require("../middlewares");
var Controller = require("../controllers");
var express = require("express");
var router = (module.exports = express.Router());

router.post("/doctor/login", Controller.doctor.login);
router.post("/doctor/signup", Controller.doctor.signup);
