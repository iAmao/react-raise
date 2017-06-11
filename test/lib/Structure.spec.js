const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const Structure = require('../../lib/Structure');
const baseDir = require('../../lib/baseDir');
const scheme = require('../../sample/folder-schema');

describe('Structure', () => {
    let structure;
    const folderScheme = [
      { new: ['text.txt'] },
      { old: [{ red: ['red.txt'] }] }
    ];

    beforeEach((done) => {
      structure = new Structure('test/lib');
      mkdirp.sync(path.join(__dirname, `example`));
      done();
    });

    afterEach((done) => {
      const filepath = path.join(__dirname, 'example');
      exec('rm -r ' + filepath, (err, stdout, stderr) => {
        return done(err);
      });
    });
    
    it('Should create an instance of Structure class', () => {
      structure = new Structure();
      expect(structure).to.be.instanceOf(Structure);
    });

    describe('traverse', () => {
      it('should traverse a folder schema and create directories and files', (done) => {
        structure.traverse(folderScheme);
        setTimeout(() => {
          expect(baseDir.directoryExists(
            path.join(__dirname, '/example/new/text.txt'))).to.eql(true);
          expect(baseDir.directoryExists(
            path.join(__dirname, '/example/old/red/red.txt'))).to.eql(true);
          done();
        }, 900);
      });
    });

    describe('build', () => {
      it('should build the file directory from the supplied schema', (done) => {
        structure.build(scheme);
        setTimeout(() => {
          expect(baseDir.directoryExists(
            path.join(__dirname, '/example/test/helper.js'))).to.eql(true);
          expect(baseDir.directoryExists(
            path.join(__dirname, '/example/src/store.js'))).to.eql(true);
          done();
        }, 900);
      });
    });
});