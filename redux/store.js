import { configureStore } from '@reduxjs/toolkit';
import visibilityReducer from './reducer'; 

const store = configureStore({
  reducer: {
    visibility: visibilityReducer,
  },
});

export default store;
