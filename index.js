const path = require('path');
const { config } = require('cobalt-common');
const { run } = require('cobalt-generator');

const argvManager = require('./lib/argv-manager.js');

module.exports = {
  config,
  run,
}
