const bddStdin = require('bdd-stdin');
const ReactRaise = require('../../lib/ReactRaise');

describe('Index', () => {
  let reactRaise;
  beforeEach(() => {
    reactRaise = new ReactRaise();
  });
  it('should create an instance of ReactRaise', () => {
    reactRaise = new ReactRaise();
    expect(reactRaise).to.be.instanceOf(ReactRaise);
  });

  describe('init', () => {
    it('should start the commnd with a set of questions', (done) => {
       const currentProps = Object.assign({}, reactRaise.privateProps);
       bddStdin('m', '\n', 'o', '\n', 'a', '\n', 'I', '\n', 'y', '\n', 'd', '\n', 'y', '\n', 'd', '\n');
       reactRaise.init('name', () => {
        expect(currentProps).to.not.eql(reactRaise.privateProps);
        done();
      }, 'test/lib/example');
    });
  });

  describe('setProp and getProp', () => {
    it('should set value on the privateProp', () => {
       reactRaise.setProp('test', [1, 2,4]);
       const privateProp = reactRaise.getProp('test');
       expect(privateProp).to.eql([1, 2,4]);
    });
  });
});