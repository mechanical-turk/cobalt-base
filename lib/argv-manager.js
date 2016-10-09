const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const path = require('path');
const { config, getCorrectedNames } = require('cobalt-common');
const { loadGenerators } = require('cobalt-generator');

function run() {
  config.COMMANDS = {
    generate: loadGenerators(),
  };
  const options = commandLineArgs(config.OPTION_DEFINITIONS);
  const modifiedOptions = _.clone(options);
  const mainArgs = modifiedOptions.mainArgs;
  const componentName = mainArgs.pop();
  let curCommand = config.COMMANDS;
  while (mainArgs.length > 0) {
    curCommand = curCommand[mainArgs.shift()];
  }
  delete modifiedOptions.mainArgs;
  modifiedOptions.componentName = getCorrectedNames(componentName);
  curCommand(modifiedOptions);
}

module.exports = {
  run,
};
