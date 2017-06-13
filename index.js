const ReactRaise = require('./lib/ReactRaise');
const speak = require('./lib/speak');
const argv = require('minimist')(process.argv.slice(2));

speak('React Raise', 'figlet');
speak(
  'Setup Information\n\tPlease answer the questions below to setup your app'
);

const app = new ReactRaise();

switch (argv._[0]) {
  case 'new':
    return (argv._[1] && argv._[1].length > 1) ?
      app.init(argv._[1]) :
      speak('ERROR: Invalid react app name', 'console', 'red');
  default:
    speak(
      `ERROR: Argument '${argv._[0]}' is not a valid argument. Use 'new' instead`,
      'console',
      'red'
      );
}
