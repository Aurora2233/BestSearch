import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import thunk from 'redux-thunk'
export  const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;