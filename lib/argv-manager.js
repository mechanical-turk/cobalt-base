const _ = require('lodash');
const config = require('../config.js')
const getCorrectedNames = require('corrected-names');

function getCommand(options) {
  const mainArgs = options.mainArgs;
  let curCommand = config.COMMANDS;
  while (typeof curCommand !== "function") {
    curCommand = curCommand[options.argv.shift()];
  }
  return curCommand;
}

module.exports = {
  getCommand,
};
