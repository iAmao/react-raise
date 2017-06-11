const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase() {
    return path.basename(process.cwd());
  },

  getCurrentWorkingDir() {
    return process.cwd();
  },

  /**
   * check if a file or directory exists
   * @param {String} filePath - file path to check
   * @returns {Boolean} if exists return true else return false
   */
  directoryExists(filePath) {
    try {
      return fs.statSync(filePath).isDirectory()
        || fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }
};
