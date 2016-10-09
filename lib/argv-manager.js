const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const path = require('path');
const { config, getCorrectedNames } = require('cobalt-common');
const { loadGenerators } = require('cobalt-generator');

function run() {
  const commands = {
    generate: loadGenerators(),
  };
  const options = commandLineArgs(config.OPTION_DEFINITIONS);
  const modifiedOptions = _.clone(options);
  const mainArgs = modifiedOptions.mainArgs;
  const componentName = mainArgs.pop();
  let curCommand = commands;
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
