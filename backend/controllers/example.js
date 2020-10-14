var Model = require('../models');
var example = module.exports = {};

example.getAll = (req, res, next) => {
    Model.examples.findAll({

    }).then( examples => {
        res.status(200).send(examples);
    })
}
