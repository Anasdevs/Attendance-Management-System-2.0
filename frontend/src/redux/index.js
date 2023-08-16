// redux/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  // You can provide additional configuration options here if needed
});

export default store;
