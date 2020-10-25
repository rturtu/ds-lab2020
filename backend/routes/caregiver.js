var Middleware = require("../middlewares");
var Controller = require("../controllers");
var express = require("express");
var router = (module.exports = express.Router());

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
