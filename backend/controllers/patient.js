var Model = require("../models");
var patient = (module.exports = {});
var randomstring = require("randomstring");

patient.add = (req, res, next) => {
    console.log(req.body);
    Model.patients
        .create({
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
