var Model = require("../models");
var patient = (module.exports = {});
var randomstring = require("randomstring");

patient.add = (req, res, next) => {
    Model.patients
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

patient.getAll = (req, res, next) => {
    Model.patients
        .findAll({
            include: [
                {
                    model: Model.medications,
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

patient.getMedicationDispenser = (req, res, next) => {
    Model.patients
        .findOne({
            where: {
                id: req.params.patientId,
            },
            include: [
                {
                    model: Model.medications,
                },
            ],
        })
        .then((result) => {
            res.status(200).send(result.medications);
        })
        .catch((err) => {
            next(err);
        });
};

patient.getFromCaregiver = (req, res, next) => {
    req.caregiver
        .getPatients({
            include: [
                {
                    model: Model.medications,
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

patient.update = (req, res, next) => {
    Model.patients
        .update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.patientId,
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

patient.delete = (req, res, next) => {
    Model.patients
        .destroy({
            where: {
                id: req.params.patientId,
            },
        })
        .then((result) => {
            res.status(200).send({});
        })
        .catch((err) => {
            next(err);
        });
};

patient.logIn = (req, res, next) => {
    Model.patients
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

patient.getInfo = (req, res, next) => {
    Model.patients
        .findOne({
            where: {
                id: req.patient.id,
            },
            include: [
                {
                    model: Model.medications,
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
