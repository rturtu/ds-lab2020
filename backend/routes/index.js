var express = require('express');
var router = module.exports = express.Router();
require('fs').readdirSync(__dirname).forEach(function(file) {
  if (file.match(/\.js$/) !== null && file.slice(0, 5) != 'index') {
    router.use(require('./' + file));
  }
});
