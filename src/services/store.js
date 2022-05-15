import { applyMiddleware, createStore, compose } from 'redux';
import thunk from "redux-thunk";
import { commonReducer } from './reducers/common-reducer'

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(commonReducer, enhancer);

export default store;
