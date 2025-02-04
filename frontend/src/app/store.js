import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice.js';
import cartSliceReducer from '../features/cartSlice.js'
import authReducer from '../features/authSlice.js'

export const store = configureStore({

  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer,
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
  
});

