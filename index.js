const ReactRaise = require('./lib/ReactRaise');
const speak = require('./lib/speak');

speak('React Raise', 'figlet');
speak(
  'Setup Information\n\tPlease answer the questions below to setup your app'
);

const app = new ReactRaise();

app.init();
