const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const structureSchema = require('../sample/folder-schema');
const baseDir = require('./baseDir');

/**
 * Define and build the application folder structure
 * @class Structure
 */
class Structure {

  /**
   * Creates an instance of Structure.
   * @param {string} extend - path to add to current working drectory
   * @param {any} schema - folder structure schema
   * @memberOf Structure
   */
  constructor(extend = '', schema) {
    this.schema = schema || structureSchema;
    this.filepath = `${baseDir.getCurrentWorkingDir()}/${extend}`;
    this.mainpath = path.join(__dirname, '../');
    this.appname = '';
  }

  /**
   * Move through the folder schema and create folders and files
   * @param {Array} dir - current directory to iterate through
   * @param {Array} pathname - contains each individual parent
   * folders name
   * @returns {Void} returns nothing
   * @memberOf Structure
   */
  traverse(dir, pathname) {
    if (!pathname) {
      pathname = [];
    }
    dir.forEach((root, index, parent) => {
      if (typeof root === 'object') {
        pathname.push(Object.keys(root)[0]);
        mkdirp.sync(
          path.join(
            this.filepath,
            `${pathname.join('/')}`));
        this.traverse(root[Object.keys(root)[0]], pathname);
      } else {
        let template = fs.readFileSync(
          path.join(this.mainpath, `/sample/${root}.sample`))
          .toString();
        if (root === 'index.html') {
          template = template.replace('(title)', this.appname);
        }
        fs.writeFile(
          path.join(
            this.filepath,
            `${pathname.join('/')}/${root}`),
          template);
        if (index === parent.length - 1) {
          pathname.pop();
        }
      }
    });
  }

  /**
   * Build the folder structure based off the provided schema
   * @param {String} name - name of react app to create
   * @returns {Promise} resolves promise when directories have been created
   * @memberOf Structure
   */
  build(name) {
    this.appname = name;
    return new Promise((resolve) => {
      this.traverse(this.schema);
      if (baseDir.directoryExists(
        path.join(
          this.filepath, '/test/helper.js'))) {
        resolve(this.schema);
      }
    });
  }
}

module.exports = Structure;
