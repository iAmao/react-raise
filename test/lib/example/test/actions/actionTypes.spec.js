import actionTypes from '../../src/actions/actionTypes';

describe('actionTypes', () => {
  it('should return an object of actions', () => {
    expect(actionTypes).to.be.an.object;
  });
});
