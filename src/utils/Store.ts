import { configureStore, ThunkAction, compose, Action, Store, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartSlice, { InitialCartItem } from './slice/cartSlice';
import orderReduct, { IInitOrder } from './slice/orderSlice';
import nextReducer, { IInitialState } from './slice/nextSlice';
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
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import uiSlice, { IInitialStateUi } from './slice/uiSlice';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};
const persisConfig: PersistConfig<any> = {
  key: '85344fefd31c62836a512d95e205d804',
  version: 1,
  storage
};

const combinedReducers = combineReducers({
  ui: uiSlice,
  cartReduce: persistReducer<InitialCartItem>({
    storage,
    key: '85344fefd31c62836a512d95e205d806'
  }, cartSlice),
  orderReducer: persistReducer<IInitOrder>({
    storage,
    key: '85344fefd31c62836a512d95e205d807'
  }, orderReduct),
  next: persistReducer<IInitialState>({
    storage,
    key: '85344fefd31c62836a512d95e205d808'
  }, nextReducer)
});

export const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});
export const persistor = persistStore(store);

const makeStore = (): Store => store;

export type RootState = ReturnType<typeof store['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);