const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ejs = require('ejs');

const filesManager = require('./files/files-manager.js');
const config = require('../config.js');
const { File } = require('./files/file.js');
const getTemplate = require('./template.js');

const allCreateFiles = {};

function loadGenerators() {
  const generators = {
    generate: {},
    remove: {},
  };
  fs.readdirSync(config.GENERATORS_DIR).forEach(function(filename) {
    const generatorPath = path.join(config.GENERATORS_DIR, filename);
    const command = filename.substring(0, filename.length - 3);
    const generatorInstance = new Generator(command);
    //TODO check if filename ends with .js
    generatorInstance.createFiles = require(generatorPath);
    generators.generate[generatorInstance.command] = generatorInstance.generate.bind(generatorInstance);
    generators.remove[generatorInstance.command] = generatorInstance.remove.bind(generatorInstance);
    allCreateFiles[command] = generatorInstance.getCreatedFiles;
  });
  return generators;
}

class Generator {

  constructor(command) {
    this.command = command;
  }

  getCreatedFiles(options) {
    let filesMetaData = this.createFiles(options, allCreateFiles);
    if (!_.isArray(filesMetaData)) {
      filesMetaData = [filesMetaData];
    }
    return filesMetaData;
  }

  remove(options) {
    let filesMetaData = this.getCreatedFiles(options);
    let filesToRemove = filesMetaData.map((fileMetaData) => {
      return new File(fileMetaData);
    });
    filesManager.removeFiles(filesToRemove);
  }

  generate(options) {
    let filesMetaData = this.getCreatedFiles(options);
    let files = filesMetaData.map((fileMeta) => this.renderFile(fileMeta));
    filesManager.saveFiles(files);
  }

  renderFile({ filename, parent, templateName, templateData }) {
    const template = getTemplate(templateName);
    return new File({
      filename,
      parent,
      content: ejs.render(
        template,
        templateData
      ),
    });
  }
};

module.exports = {
  loadGenerators,
  Generator,
};
