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
   * @param {String} withExpress - configuration with express server
   * @returns {Promise} if successful, resolves and pass in the
   * configuration as argument. Else reject and pass the error
   * @memberOf Generate
   */
  webpack(withExpress = 'n') {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(this.mainpath, '/sample/webpack.config.sample'),
        (err, data) => {
          let webpack = data.toString();
          if (withExpress === 'y') {
            webpack = webpack.replace(
              '\'webpack-dev-server/client?/\',',
              '//\'webpack-dev-server/client?/\'');
            webpack = webpack.replace(
              'webpack/hot/dev-server',
              'webpack-hot-middleware/client?reload=true');
          }
          fs.writeFile(
            path.join(
              this.filepath,
              '/webpack.config.js'),
            webpack,
            (err) => {
              if (err) {
                return reject(err);
              }
              return resolve(webpack);
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
            path.join(
              this.filepath,
              '/.babelrc'),
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
          test: '',
          'test:frontend':
            'NODE_ENV=test mocha -w test/mocha-helper.js test/**/*.spec.js --slow 5000 --compilers js:babel-register',
          start: 'webpack',
          'start-dev': 'webpack-dev-server --config webpack.config.js --open --content-base dist/'
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
        path.join(
          this.filepath,
          '/package.json'),
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
   * @param {String} entry - name of express server file
   * @returns {Promise} if successful, resolves and pass in the
   * configuration as argument. Else reject and pass the error
   * @memberOf Generate
   */
  express(entry) {
    return new Promise((resolve, reject) => {
      const main = (!entry || entry === '') ? 'index.js' : entry;
      fs.readFile(
        path.join(this.mainpath, '/sample/express.sample'),
        (err, data) => {
          fs.writeFile(
            path.join(
              this.filepath,
              `/${main}`),
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
            path.join(
              this.filepath,
              '/.eslintrc'),
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
      this.webpack(setupInfo.express[0]).then(() => {
        this.eslintrc().then(() => {
          this.package(setupInfo).then(() => {
            this.babelrc().then(() => {
              if (setupInfo.express[0] === 'y') {
                this.express(setupInfo.main).then(() => {
                  resolve();
                });
              } else {
                resolve();
              }
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
