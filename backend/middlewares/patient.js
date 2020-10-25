var patient = (module.exports = {});
var Model = require("../models");

patient.register = (req, res, next) => {
    if (!req.body.username) next("Username missing");
    if (!req.body.password) next("Password missing");
    next();
};

patient.isLogged = (req, res, next) => {
    Model.patients
        .findOne({
            where: {
                token: req.headers.token,
            },
        })
        .then((result) => {
            if (result) {
                req.patient = result;
                next();
            } else {
                next("Wrong credentials");
            }
        })
        .catch((err) => {
            next(err);
        });
};
