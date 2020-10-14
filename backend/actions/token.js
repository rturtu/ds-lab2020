var jwt = require('jsonwebtoken');
var Model = require('../models');

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
  generateToken: function(req, res, next) {
      req.token = createToken(req.auth);
      Model.users.update({
          token: req.token,
      },{
          returning: true,
          plain: true,
          where: {
              id: req.user.id
          }
      }).then(result => {

      }).catch(err => {
          console.log(err);
        return next(err);
      })
      return next();
  },
  sendToken: function(req, res) {
      res.setHeader('x-auth-token', req.token);
      req.user['authToken'] = req.token;
      return res.status(200).send(JSON.stringify(req.user));
  }
};
