var Model = require("../models");
var medication = (module.exports = {});
var randomstring = require("randomstring");

medication.add = (req, res, next) => {
    Model.medications
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

medication.update = (req, res, next) => {
    Model.medications
        .update(
            {
                ...req.body,
            },
            {
                where: {
                    id: req.params.medicationId,
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

medication.delete = (req, res, next) => {
    Model.medications
        .destroy({
            where: {
                id: req.params.medicationId,
            },
        })
        .then((result) => {
            res.status(200).send({});
        })
        .catch((err) => {
            next(err);
        });
};
