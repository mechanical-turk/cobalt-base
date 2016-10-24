const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const config = require('../config.js')
const getCorrectedNames = require('./utils/name-manager');

function getOptions() {
  const options = commandLineArgs(config.OPTION_DEFINITIONS);
  const modifiedOptions = _.clone(options);
  const componentName = modifiedOptions.mainArgs.pop();
  modifiedOptions.name = getCorrectedNames(componentName);
  return modifiedOptions;
}

function getCommand(options) {
  const mainArgs = options.mainArgs;
  let curCommand = config.COMMANDS;
  while (typeof curCommand !== "function") {
    curCommand = curCommand[options.mainArgs.shift()];
  }
  return curCommand;
}

module.exports = {
  getOptions,
  getCommand,
};
