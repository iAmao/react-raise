const inquirer = require('inquirer');

/**
 * Construct questions and ask then using the inquirer module
 * @class Inquire
 */
class Inquire {

  /**
   * Creates an instance of Inquire.
   * @memberOf Inquire
   */
  constructor() {
    this.questions = [];
    this.validate = {
      notEmpty(value) {
        return (value && value.length && value.length > 0) ?
          true : 'Please enter a value';
      },
      yesNo(value) {
        return (value &&
          ['y', 'n', 'yes', 'no'].indexOf(value.toLowerCase()) !== -1) ?
          true : 'Invalid input to yes/no question';
      }
    };
  }

  /**
   * Add a question to the questions property
   * @param {String} name - name of the question
   * @param {String} type - type of input
   * @param {String} message - body of the message
   * @param {String} validate - validation method to use
   * @returns {Void} - returns nothing
   *
   * @memberOf Inquire
   */
  question(name, type, message, validate) {
    const details = {
      name,
      type,
      message,
      validate: (!validate) ? undefined : this.validate[validate]
    };
    this.questions.push(details);
  }

  /**
   * Combine and ask all the questions in the questions property
   * @param {Function} callback - function to run after user is done
   * with questions
   * @returns {Void} - returns nothing
   * @memberOf Inquire
   */
  ask(callback) {
    return new Promise((resolve) => {
      inquirer.prompt(this.questions).then((answers) => {
        callback(answers);
        resolve(answers);
      });
    });
  }
}

module.exports = Inquire;
