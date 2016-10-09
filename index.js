const path = require('path');
const { config } = require('cobalt-common');
const argvManager = require('./lib/argv-manager.js');

module.exports = {
  config,
  run: argvManager.run,
}
