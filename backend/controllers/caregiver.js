var Model = require("../models");
var caregiver = (module.exports = {});
var randomstring = require("randomstring");

caregiver.add = (req, res, next) => {
    Model.caregivers
        .create({
            username: randomstring.generate(60),
            password: randomstring.generate(60),
            token: randomstring.generate(60),
            ...req.body,
        })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
};

caregiver.getAll = (req, res, next) => {
    Model.caregivers
        .findAll({
            include: [
                {
                    model: Model.patients,
                },
            ],
        })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
};

caregiver.update = (req, res, next) => {
    Model.caregivers
        .update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.caregiverId,
                },
            }
        )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            next(err);
        });
};

caregiver.delete = (req, res, next) => {
    Model.caregivers
        .destroy({
            where: {
                id: req.params.caregiverId,
            },
        })
        .then((result) => {
            res.status(200).send({});
        })
        .catch((err) => {
            next(err);
        });
};

caregiver.logIn = (req, res, next) => {
    Model.caregivers
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
                next("Wrong credentials");
            }
        })
        .catch((err) => {
            next(err);
        });
};

caregiver.addPatient = (req, res, next) => {
    Model.caregivers
        .findOne({
            where: {
                id: req.body.caregiverId,
            },
        })
        .then((result) => {
            result.addPatient(req.body.patientId).then((result) => {
                res.status(200).end();
            });
        })
        .catch((err) => {
            next(err);
        });
};

caregiver.removePatient = (req, res, next) => {
    Model.caregiver
        .findOne({
            where: {
                id: req.body.caregiverId,
            },
        })
        .then((result) => {
            result.removePatient(req.body.patientId).then((result) => {
                res.status(200).end();
            });
        })
        .catch((err) => {
            next(err);
        });
};
