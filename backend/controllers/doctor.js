var Model = require("../models");
var doctor = (module.exports = {});
var randomstring = require("randomstring");

doctor.login = (req, res, next) => {
    Model.doctors
        .findOne({
            where: {
                username: req.body.username,
            },
        })
        .then((result) => {
            if (result && result.validPassword(req.body.password)) {
                const token = result.generateToken();
                res.status(200).send({ token });
            } else {
                res.sendStatus(401);
            }
        })
        .catch((err) => {
            next(err);
        });
};

doctor.signup = (req, res, next) => {
    console.log(req.body);
    Model.doctors
        .create({
            username: req.body.username,
            password: req.body.password,
            token: randomstring.generate(60),
        })
        .then((result) => {
            console.log("sault", result);
            res.status(200).send({
                token: result.token,
            });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};
