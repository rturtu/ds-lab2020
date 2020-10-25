var Middleware = require("../middlewares");
var Controller = require("../controllers");
var express = require("express");
var router = (module.exports = express.Router());

router.post(
    "/caregiver",
    Middleware.caregiver.register,
    Controller.caregiver.add
);
router.post("/caregiver/login", Controller.caregiver.logIn);

router.get(
    "/caregiver/patients",
    Middleware.caregiver.isLogged,
    Controller.patient.getFromCaregiver
);

router.put(
    "/doctor/caregiver/:caregiverId",
    Middleware.doctor.isLogged,
    Controller.caregiver.update
);
router.delete(
    "/doctor/patient/:caregiverId",
    Middleware.doctor.isLogged,
    Controller.caregiver.delete
);
router.get(
    "/doctor/caregivers",
    Middleware.doctor.isLogged,
    Controller.caregiver.getAll
);
router.post(
    "/doctor/caregiver",
    Middleware.doctor.isLogged,
    Controller.caregiver.add
);

router.post(
    "/doctor/caregiver/patients",
    Middleware.doctor.isLogged,
    Controller.caregiver.addPatient
);
router.delete(
    "/doctor/caregiver/patients",
    Middleware.doctor.isLogged,
    Controller.caregiver.removePatient
);
