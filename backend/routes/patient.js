var Middleware = require("../middlewares");
var Controller = require("../controllers");
var express = require("express");
var router = (module.exports = express.Router());

router.put(
    "/doctor/patient/:patientId",
    Middleware.doctor.isLogged,
    Controller.patient.update
);
router.delete(
    "/doctor/patient/:patientId",
    Middleware.doctor.isLogged,
    Controller.patient.delete
);
router.get(
    "/doctor/patients",
    Middleware.doctor.isLogged,
    Controller.patient.getAll
);
router.post(
    "/doctor/patient",
    Middleware.doctor.isLogged,
    Controller.patient.add
);
