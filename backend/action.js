require('fs').readdirSync(__dirname + '/actions/').forEach(function(file) {
  if (file.match(/\.js$/) !== null) {
    var name = file.replace('.js', '');
    exports[name] = require('./actions/' + file);
  }
});
