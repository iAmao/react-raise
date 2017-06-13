import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/root.reducer';

const middleware = [thunk];

const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);

export default finalCreateStore(reducers);
