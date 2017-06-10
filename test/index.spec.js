const index = require('../index');

describe('Index', () => {
  it('should test the dummy function', () => {
    expect(index()).to.eql(true);
  });
});