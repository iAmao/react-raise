const chalk = require('chalk');
const figlet = require('figlet');

/**
 * Print a message on the console
 * @param {String} message - message to print to screen
 *  @param {String} [type='console'] - type of message to print
 * @param {String} [color='cyan'] - color of message
 * @returns {Void} returns nothing
 */
function speak(message, type = 'console', color = 'cyan') {
  if (type === 'console') {
    console.log(chalk[color](message)); //eslint-disable-line
  } else {
    console.log(  //eslint-disable-line
      chalk[color](
        figlet.textSync(message, { horizontalLayout: 'full' })
    ));
  }
  return { type, message, color };
}

module.exports = speak;
