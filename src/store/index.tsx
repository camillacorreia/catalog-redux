import { applyMiddleware, createStore } from 'redux';
import { ICartState } from './modules/cart/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/rootReducer';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;