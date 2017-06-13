import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Common from './common/Common.component';
import Home from './Home.component';
import About from './static/About.component';

const routes = (
  <Route path="/" component={Common}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
  </Route>
);


/**
 * Declare and define all routes in the application
 * @class Routes
 * @extends {React.Component}
 */
class Routes extends React.Component {

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf Routes
   */
  render() {
    return (
      <Router history={browserHistory} routes={routes} />
    );
  }
}

export default Routes;
