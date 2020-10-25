var Model = require("../models");
var caregiver = (module.exports = {});
var randomstring = require("randomstring");

caregiver.add = (req, res, next) => {
    Model.caregivers
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

caregiver.getAll = (req, res, next) => {
    Model.caregivers
        .findAll()
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
