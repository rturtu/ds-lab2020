var Middleware = require("../middlewares");
var Controller = require("../controllers");
var express = require("express");
var router = (module.exports = express.Router());

router.post("/patient", Middleware.patient.register, Controller.patient.add);
router.post("/patient/login", Controller.patient.logIn);
router.get("/patient", Middleware.patient.isLogged, Controller.patient.getInfo);

router.put(
    "/caregiver/patient/:patientId",
    Middleware.caregiver.isLogged,
    Middleware.caregiver.hasPatient,
    Controller.patient.update
);

router.get(
    "/medication-dispenser/:patientId",
    Controller.patient.getMedicationDispenser
);

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
