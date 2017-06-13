import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './components/Routes.component';

require('./sass/style.scss');
require('./sass/style.less');


ReactDom.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
