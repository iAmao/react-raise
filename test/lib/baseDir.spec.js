const path = require('path');
const baseDir = require('../../lib/baseDir');

describe('baseDir', () => {
   
   describe('getCurrentDirectoryBase', () => {
     it('should get the basename of the current directory', () => {
        expect(baseDir.getCurrentDirectoryBase()).to.eql('react-raise');
     });
   });

   describe('getCurrentWorkingDir', () => {
     it('should get the full path of the current directory', () => {
        expect(baseDir.getCurrentWorkingDir()).to.eql(path.join(__dirname, '../..'));
     });
   });

   describe('directoryExists', () => {
     it('should return false if a directory does not exists', () => {
        expect(baseDir.directoryExists('404/')).to.eql(false);
     });
     it('should return true if a directory exists', () => {
        expect(baseDir.directoryExists(path.join(__dirname, '../lib'))).to.eql(true);
     });
   });

});
