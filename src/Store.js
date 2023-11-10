import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './modules';
import { configureStore } from '@reduxjs/toolkit';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;