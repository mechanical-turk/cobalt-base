const fs = require('fs');
const path = require('path');
const config = require('../config.js');

const templates = {};

function getTemplate(templateName) {
  const templateNameSplit = templateName.split('.');
  const filename = templateNameSplit.pop();
  templateNameSplit.push(`${filename}.ejs`);
  let templatePath = path.join(
    config.TEMPLATES_DIR,
    ...templateNameSplit
  );
  if (!templates[templatePath]) {
    templates[templatePath] = fs.readFileSync(templatePath, 'utf8');
  }
  return templates[templatePath];
}

module.exports = getTemplate;
