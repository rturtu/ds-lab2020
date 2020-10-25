var doctor = (module.exports = {});
var Model = require("../models");

doctor.isLogged = (req, res, next) => {
    Model.doctors
        .findOne({
            where: {
                token: req.headers.token,
            },
        })
        .then((result) => {
            req.doctor = result;
            next();
        })
        .catch((err) => {
            next(err);
        });
};
