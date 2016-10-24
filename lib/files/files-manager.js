const config = require('../../config.js')
const yesOrNo = require('../utils/yes-or-no.js');
const clc = require('cli-color');

function saveFiles(files) {
  files.forEach((file) => {
    let save = true;
    let overwrite = false;
    if (file.exists()) {
      const promptMessage = clc.yellow(config.PROMPTS.CONFIRM_OVERWRITE(
        file.getFilePathWithRoot()
      ));
      overwrite = yesOrNo(promptMessage, {});
      if (!overwrite) {
        save = false;
      }
    }
    if (save) {
      file.save();
      if (overwrite) {
        console.log(clc.red(
          config.MESSAGES.FILE_OVERWRITTEN(file.getFilePathWithRoot())
        ));
      } else {
        console.log(clc.green(
          config.MESSAGES.FILE_SAVED(file.getFilePathWithRoot())
        ));
      }
    }
  });
}

function removeFiles(files) {
  files.forEach((file) => {
    try {
      file.remove();
      console.log(clc.red(
        config.MESSAGES.FILE_REMOVED(file.getFilePathWithRoot())
      ));
    } catch (Error) {
      throw Error;
    }
  });
}

module.exports = {
  saveFiles,
  removeFiles,
};
