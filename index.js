const config = require('./config.js');
const getCorrectedNames = require('corrected-names');
const commandLineArgs = require('command-line-args');

const loader = require('./lib/loader.js');
const { getCommand } = require('./lib/argv-manager.js');
const { loadGenerators } = require('./lib/generator.js');

function run() {
  const generators = loadGenerators();
  config.COMMANDS.generate = generators.generate;
  config.COMMANDS.remove = generators.remove;
  const options = commandLineArgs(config.OPTION_DEFINITIONS);
  const command = getCommand(options);
  command(options);
}

module.exports = {
  config,
  run,
  loader,
}
