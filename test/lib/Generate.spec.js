const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const Generate = require('../../lib/Generate');
const baseDir = require('../../lib/baseDir');

describe('Generate', () => {
    let generate;
    beforeEach((done) => {
      generate = new Generate('test/lib');
      mkdirp.sync(path.join(__dirname, `example`),  (err) => {
        if (err) {
          done(err);
        }
      });
      done();
    });

    afterEach((done) => {
      const filepath = path.join(__dirname, 'example');
      exec('rm -r ' + filepath, function (err, stdout, stderr) {
        if (err) {
          return done(err);
        }
        return done();
      });
    });
    
    it('Should create an instance of Generate class', () => {
      generate = new Generate();
      expect(generate).to.be.instanceOf(Generate);
    });

    describe('Package', () => {
      it('should create a package.json file with provided setup info', (done) => {
        generate.package({
          express: 'y',
          author: 'Test',
          main: 'main.js',
          description: 'A test app',
          name: 'test',
          license: 'ISC'
        }).then(() => {
          expect(baseDir.directoryExists(path.join(__dirname, '/example/package.json'))).to.eql(true);
          fs.readFile(
            path.join(__dirname, '/example/package.json'),
            (err, data) => {
              if (err) {
                return done(err);
              }
              const package = JSON.parse(data.toString());
              expect(package.author).to.eql('Test');
              expect(package.main).to.eql('main.js');
              expect(package.name).to.eql('test');
              expect(package.license).to.eql('ISC');
              expect(package.dependencies).to.have.property('express');
              done();              
            });
        });
      });
      it('should create a package.json file with provided setup info and default info', (done) => {
        generate.package({
          express: 'n',
          name: 'test',
        }).then(() => {
          expect(baseDir.directoryExists(path.join(__dirname, '/example/package.json'))).to.eql(true);
          fs.readFile(
            path.join(__dirname, '/example/package.json'),
            (err, data) => {
              if (err) {
                return done(err);
              }
              const package = JSON.parse(data.toString());
              expect(package.author).to.eql('');
              expect(package.main).to.eql('index.js');
              expect(package.name).to.eql('test');
              expect(package.license).to.eql('MIT');
              expect(package.dependencies).to.not.have.property('express');
              done();              
            });
        }).catch((err) => console.log(err));
      });
      it('should fail to create package.json file if error occurs', (done) => {
        generate = new Generate('tst/lib');
        generate.package({
          express: 'n',
          name: 'test',
        }).catch((err) => {
          expect(err).to.have.property('errno');
          done();
        });
      });
    });

    describe('Webpack', () => {
      it('should create a webpack.config.js file with provided setup info', (done) => {
        generate.webpack().then((config) => {
          expect(baseDir.directoryExists(path.join(__dirname, '/example/webpack.config.js'))).to.eql(true);
          fs.readFile(
            path.join(__dirname, '../../sample/webpack.config.sample'),
            (err, data) => {
              if (err) {
                return done(err);
              }
              const webpack = data.toString();
              expect(webpack).to.eql(config);
              done();              
            });
        });
      });
      it('should fail to create a webpack.config.js file if error occurs', (done) => {
        generate = new Generate('/ts/');
        generate.webpack().catch((err) => {
          expect(err).to.have.property('errno');
          done();
        });
      });
    });

    describe('Babelrc', () => {
      it('should create a .babelrc file with sample setup info', (done) => {
        generate.babelrc().then((config) => {
          expect(baseDir.directoryExists(path.join(__dirname, '/example/.babelrc'))).to.eql(true);
          fs.readFile(
            path.join(__dirname, '../../sample/babelrc.sample'),
            (err, data) => {
              const babelrc = data.toString();
              expect(babelrc).to.eql(config);
              done();              
            });
        });
      });
      it('should fail to create a .babelrc file if error occurs', (done) => {
        generate = new Generate('/ts/');
        generate.babelrc().catch((err) => {
          expect(err).to.have.property('errno');
          done();
        });
      });
    });

    describe('Eslintrc', () => {
      it('should create a .eslintrc file with sample setup info', (done) => {
        generate.eslintrc().then((config) => {
          expect(baseDir.directoryExists(path.join(__dirname, '/example/.eslintrc'))).to.eql(true);
          fs.readFile(
            path.join(__dirname, '../../sample/eslintrc.sample'),
            (err, data) => {
              const eslintrc = data.toString();
              expect(eslintrc).to.eql(config);
              done();              
            });
        });
      });
      it('should fail to create a .eslintrc file if error occurs', (done) => {
        generate = new Generate('/ts/');
        generate.eslintrc().catch((err) => {
          expect(err).to.have.property('errno');
          done();
        });
      });
    });

    describe('All', () => {
      it('should create a .eslintrc, webpack.config.js, .babelrc, package.json', (done) => {
        generate.all({
          express: 'y',
          author: 'Test',
          main: 'main.js',
          description: 'A test app',
          name: 'test',
          license: 'ISC'
        }).then(() => {
          expect(baseDir.directoryExists(path.join(__dirname, '/example/.eslintrc'))).to.eql(true);
          expect(baseDir.directoryExists(path.join(__dirname, '/example/.babelrc'))).to.eql(true);
          expect(baseDir.directoryExists(path.join(__dirname, '/example/webpack.config.js'))).to.eql(true);
          expect(baseDir.directoryExists(path.join(__dirname, '/example/package.json'))).to.eql(true);
          done();
        });
      });
      it('should fail to create webpack.config.js file if error occurs', (done) => {
        generate = new Generate('tst/lib');
        generate.all({
          express: 'n',
          name: 'test',
        }).catch((err) => {
          expect(err).to.have.property('errno');
          done();
        });
      });
    });

});