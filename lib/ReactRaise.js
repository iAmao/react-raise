const Inquire = require('./Inquire');
const Generate = require('./Generate');
const Structure = require('./Structure');

const speak = require('./speak');

/**
 * ReactRaise class
 * @class ReactRaise
 */
class ReactRaise {

  /**
   * Creates an instance of ReactRaise.
   * @memberOf ReactRaise
   */
  constructor() {
    this.privateProps = new WeakMap();
    this.privateProps.set(this, {
      setupInfo: {},
    });
  }

  /**
   * set or alter the private properties;
   * @param {String} key - key of item to set
   * @param {any} value - value to store inside private property
   * @returns {object} set private properties
   * @memberOf ReactRaise
   */
  setProp(key, value) {
    return this.privateProps.set(
      this,
      Object.assign({}, this.privateProps.get(this), { [key]: value })
    );
  }

  /**
   * get the private properties;
   * @param {String} key - key of item to get
   * @returns {object} set private properties
   * @memberOf ReactRaise
   */
  getProp(key) {
    return this.privateProps.get(this)[key];
  }

  /**
   * initialize command and ask setup questions
   * @param {String} name - name of react app to create
   * @param {Function} callback - function to execute after answers
   * @param {String} basepath - base path to create the files in
   * has been given
   * @returns {Void} returns nothing
   * @memberOf ReactRaise
   */
  init(name, callback, basepath) {
    const configGenerate = new Generate(basepath);
    const fileStructure = new Structure(basepath);
    const startInquire = new Inquire();
    startInquire.question(
      'description',
      'input',
      'Can you describe your app[optional]');
    startInquire.question(
      'main',
      'input',
      'What is the main entry file of your app[Default: index.js]');
    startInquire.question(
      'author',
      'input',
      'What is your name[optional]');
    startInquire.question(
      'license',
      'input',
      'What is license is your app under[Default: MIT]'
    );
    startInquire.question(
      'express',
      'input',
      'Do you want to configure an express server with this app(y/n)',
      'yesNo'
    );

    startInquire.ask((answers) => {
      this.setProp('setupInfo', answers);
      if (callback) {
        callback();
      }
      fileStructure.build(name);
      configGenerate.all(Object.assign({}, answers, { name }));

      speak(`> Your Project ${name}, has been setup`);
      speak('> run: \'npm install\'');
      speak('> start development server with: \'npm run start-dev\'');
    });
  }
}

module.exports = ReactRaise;
