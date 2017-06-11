const speak = require('../../lib/speak');

describe('speak', () => {
  it('should print a cyan message on the screen', () => {
    const output = speak('This is a message');
    expect(output).to.eql({ type: 'console', message: 'This is a message', color: 'cyan' });
  });
  it('should print a red message on the screen', () => {
    const output = speak('This is a message', 'console', 'red');
    expect(output).to.eql({ type: 'console', message: 'This is a message', color: 'red' });
  });
  it('should print a red figlet on the screen', () => {
    const output = speak('message', 'figlet', 'red');
    expect(output).to.eql({ type: 'figlet', message: 'message', color: 'red' });
  });
});