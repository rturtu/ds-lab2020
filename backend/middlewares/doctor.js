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
            if (result) {
                req.doctor = result;
                next();
            } else {
                next("Not logged");
            }
        })
        .catch((err) => {
            next(err);
        });
};
