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

router.put(
    "/caregiver/medication/:medicationId",
    Middleware.caregiver.isLogged,
    Middleware.caregiver.hasPatient,
    Controller.medication.update
);

router.delete(
    "/caregiver/medication/:medicationId",
    Middleware.caregiver.isLogged,
    Middleware.caregiver.hasPatient,
    Controller.medication.delete
);
router.post(
    "/caregiver/medication",
    Middleware.caregiver.isLogged,
    Middleware.caregiver.hasPatient,
    Controller.medication.add
);
