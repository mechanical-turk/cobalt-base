const config = {
  SAVE_ROOT: '',
  ERR: {
    FILE_NOT_FOUND: (filepath) => {
      return `File doesn't exist: <${filepath}>.`;
    },
    FILE_ALREADY_EXISTS: (filepath) => {
      return `File already exists: <${filepath}>.`;
    },
    FILE_EXISTS: (filepath) => {
      return `File exists: <${filepath}>.`;
    },
  },
  MESSAGES: {
    FILE_SAVED: (filepath) => {
      return `File saved: <${filepath}>`;
    },
    FILE_OVERWRITTEN: (filepath) => {
      return `File overwritten: <${filepath}>`;
    },
    FILE_REMOVED: (filepath) => {
      return `File removed: <${filepath}>`;
    },
  },
  PROMPTS: {
    CONFIRM_OVERWRITE: (filepath) => {
      return `${config.ERR.FILE_ALREADY_EXISTS(
        filepath)
      } Are you sure you want to overwrite this file?`;
    },
  },
  OPTION_DEFINITIONS: [
    { name: 'argv', type: String, multiple: true, defaultOption: true },
  ],
  ERR_DEV: {
    FUNCTION_NOT_IMPLEMENTED: (functionName) => {
      return `${functionName} not implemented.`;
    },
    FIELD_NOT_SET: (fieldName) => {
      return `${fieldName} not found. Don't forget to assign it a value in the constructor.`;
    },
    TEMPLATE_PATHS_NOT_FOUND: (command) => {
      return `templatePaths for <${command}> not found. Modify the config.js file to add templatePaths for this command. Look for config.TEMPLATES.`;
    },
  },
  COMMANDS: {
  },
};

module.exports = config;
