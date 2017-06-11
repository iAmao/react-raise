const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

const baseDir = require('./baseDir');
const packages = require('../sample/dependencies');

/**
 * Auto generator for configuration files
 * @class Generate
 */
class Generate {

  /**
   * @param {String} extend - extend the pworking dorectory
   * Creates an instance of Generate.
   * @memberOf Generate
   */
  constructor(extend = '') {
    this.mainpath = path.join(__dirname, '../');
    this.filepath = `${baseDir.getCurrentWorkingDir()}/${extend}`;
    this.basename = baseDir.getCurrentDirectoryBase();
  }

  /**
   * webpack - Generate a webpack config file from the sample
   * @returns {Promise} if successful, resolves and pass in the
   * configuration as argument. Else reject and pass the error
   * @memberOf Generate
   */
  webpack() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(this.mainpath, '/sample/webpack.config.sample'),
        (err, data) => {
          fs.writeFile(
            path.join(this.filepath, '/example/webpack.config.js'),
            data.toString(),
            (err) => {
              if (err) {
                return reject(err);
              }
              return resolve(data.toString());
            });
        });
    });
  }

  /**
   * babelrc - Generate a .babelrc file from the sample
   * @returns {Promise} if successful, resolves and pass in the
   * configuration as argument. Else reject and pass the error
   * @memberOf Generate
   */
  babelrc() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(this.mainpath, '/sample/babelrc.sample'),
        (err, data) => {
          fs.writeFile(
            path.join(this.filepath, '/example/.babelrc'),
            data.toString(),
            (err) => {
              if (err) {
                return reject(err);
              }
              return resolve(data.toString());
            });
        });
    });
  }

  /**
   * package - Generate a package.json file
   * @param {Object} setupInfo - setup information provided by user
   * @returns {Promise} if successful, resolves and pass in the
   * configurations as argument. Else reject and pass the error
   * @memberOf Generate
   */
  package(setupInfo) {
    return new Promise((resolve, reject) => {
      let dependencies;
      const sortedDependencies = {};
      if (setupInfo.express === 'y' || setupInfo.express === 'yes') {
        dependencies = Object.assign(
          {},
          packages.dependencies,
          packages.express
        );
      } else {
        dependencies = packages.dependencies;
      }

      Object.keys(dependencies).sort().forEach((dependency) => {
        sortedDependencies[dependency] = dependencies[dependency];
      });

      const packageEx = {
        name: setupInfo.name,
        version: '1.0.0',
        description: (!setupInfo.description || setupInfo.description === '') ?
          '' : setupInfo.description,
        main: (!setupInfo.main || setupInfo.main === '') ?
          'index.js' : setupInfo.main,
        scripts: {
          test: ''
        },
        keywords: [],
        author: (!setupInfo.author || setupInfo.author === '') ?
          '' : setupInfo.author,
        license: (!setupInfo.license || setupInfo.license === '') ?
          'MIT' : setupInfo.license,
        dependencies: sortedDependencies,
        devDependencies: packages.devDependencies
      };
      jsonfile.writeFile(
        path.join(this.filepath, '/example/package.json'),
        packageEx, { spaces: 2 }, (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(packageEx);
        });
    });
  }

  /**
   * eslintrc - Generate a .eslintrc file from the sample
   * @returns {Promise} if successful, resolves and pass in the
   * configuration as argument. Else reject and pass the error
   * @memberOf Generate
   */
  eslintrc() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(this.mainpath, '/sample/eslintrc.sample'),
        (err, data) => {
          fs.writeFile(
            path.join(this.filepath, '/example/.eslintrc'),
            data.toString(),
            (err) => {
              if (err) {
                return reject(err);
              }
              resolve(data.toString());
            });
        });
    });
  }

  /**
   * all - Generates package.json, webpack.config.js, .eslintrc, .babelrc
   * @param {Object} setupInfo - setup information provided by user
   * @returns {Promise} if successful, resolves the promise.
   * Else reject and pass the error
   * @memberOf Generate
   */
  all(setupInfo) {
    return new Promise((resolve, reject) => {
      this.webpack().then(() => {
        this.eslintrc().then(() => {
          this.package(setupInfo).then(() => {
            this.babelrc().then(() => {
              resolve();
            });
          });
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = Generate;
