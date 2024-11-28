import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './reducers/itemReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
