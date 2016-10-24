const config = require('./config.js');
const { getOptions, getCommand } = require('./lib/argv-manager.js');
const { loadGenerators } = require('./lib/generator.js');

function run() {
  const generators = loadGenerators();
  config.COMMANDS = {
    generate: generators.generate,
    remove: generators.remove,
  };
  const options = getOptions();
  const command = getCommand(options);
  command(options);
}

module.exports = {
  config,
  run,
}
