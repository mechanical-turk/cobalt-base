const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const config = require('../../config.js');


class File {
  constructor({
    name,
    type,
    filename,
    parent,
    content,
  }) {
    this.name = name;
    this.type = type;
    this.filename = filename;
    this.parent = parent;
    this.content = content;
  }

  /*
    Returns filepath with respect to the root folder of the application
  */
  getFilePathWRTRoot() {
    return path.join(
      this.parent,
      this.filename
    );
  }

  getFilePathWithRoot() {
    return path.join(
      config.SAVE_ROOT,
      this.getFilePathWRTRoot()
    );
  }

  /*
    Returns the filepath of the file in the host file system
  */
  getAbsoluteFilePath() {
    /*
      TODO make this work regardless of being in the app or being
      in the parent folder of app. Right now, we are assuming we are
      in the parent folder of app.
    */
    return path.join(
      process.cwd(),
      config.SAVE_ROOT,
      this.getFilePathWRTRoot()
    );
  }

  /*
    Saves the file to the host file system
  */
  save() {
    fs.outputFileSync(
      this.getAbsoluteFilePath(),
      this.content
    );
  }

  /*
    Checks if the file exists in the host file system
  */
  exists() {
    try {
      fs.statSync(this.getAbsoluteFilePath());
      return true;
    }
    catch (e) {
      return false;
    }
  }

  /*
    Removes this file from the host file system
  */
  remove() {
    fs.unlinkSync(this.getAbsoluteFilePath());
  }
}

module.exports = {
  File
};
