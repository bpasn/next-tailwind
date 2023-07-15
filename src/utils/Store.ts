import { configureStore, ThunkAction, compose, Action, Store, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cartSlice } from './slice/cartSlice';
import orderReduct from './slice/orderSlice';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const combinedReducers = combineReducers({
  cartReduce: cartSlice.reducer,
  orderReducer: orderReduct
})
const store = configureStore({
  reducer: combinedReducers
})
const makeStore = (): Store => store

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore)