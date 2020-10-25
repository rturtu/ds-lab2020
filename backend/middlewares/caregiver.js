var caregiver = (module.exports = {});
var Model = require("../models");

caregiver.register = (req, res, next) => {
    if (!req.body.username) next("Username missing");
    if (!req.body.password) next("Password missing");
    next();
};

caregiver.isLogged = (req, res, next) => {
    Model.caregivers
        .findOne({
            where: {
                token: req.headers.token,
            },
        })
        .then((result) => {
            if (result) {
                req.caregiver = result;
                next();
            } else {
                next("Wrong credentials");
            }
        })
        .catch((err) => {
            next(err);
        });
};

caregiver.hasPatient = (req, res, next) => {
    const patientId = req.params.patientId
        ? parseInt(req.params.patientId)
        : req.body.patientId;
    req.caregiver.getPatients().then((result) => {
        if (result.find((patient) => patient.id === patientId)) {
            next();
        } else {
            next("You cant update this patient");
        }
    });
};
