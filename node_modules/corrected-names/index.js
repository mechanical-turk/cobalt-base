const camelCase = require('camelcase');
const upperCamelCase = require('uppercamelcase');
const decamelize = require('decamelize');

function getCorrectedNames(name) {
  const camelCaseName = camelCase(name);
  const pascalCaseName = upperCamelCase(camelCaseName);
  const underscoredName = decamelize(camelCaseName, '_');
  const dashedName = decamelize(camelCaseName, '-');
  return {
    camelCaseName,
    pascalCaseName,
    underscoredName,
    dashedName,
    originalName: name,
  };
}

module.exports = getCorrectedNames;
