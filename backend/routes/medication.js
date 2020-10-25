var Middleware = require("../middlewares");
var Controller = require("../controllers");
var express = require("express");
var router = (module.exports = express.Router());

router.put(
    "/doctor/medication/:medicationId",
    Middleware.doctor.isLogged,
    Controller.medication.update
);
router.delete(
    "/doctor/medication/:medicationId",
    Middleware.doctor.isLogged,
    Controller.medication.delete
);
router.post(
    "/doctor/medication",
    Middleware.doctor.isLogged,
    Controller.medication.add
);
