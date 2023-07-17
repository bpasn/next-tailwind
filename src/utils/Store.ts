import { configureStore, ThunkAction, compose, Action, Store, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartSlice from './slice/cartSlice';
import orderReduct from './slice/orderSlice';
import nextReducer from './slice/nextSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
  persistCombineReducers,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const persisConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage
}

const cartPersis = persistReducer(persisConfig, cartSlice)
const orderPersis = persistReducer(persisConfig, orderReduct)
const nextPersis = persistReducer(persisConfig, nextReducer)

const combinedReducers = combineReducers({
  cartReduce: cartPersis,
  orderReducer: orderPersis,
  next: nextPersis
})

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})
export const persistor = persistStore(store)
const makeStore = (): Store => store
export type RootState = ReturnType<typeof store['getState']>
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