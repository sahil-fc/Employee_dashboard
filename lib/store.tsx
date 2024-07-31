import { combineReducers, configureStore } from '@reduxjs/toolkit';
import profileReducer from '../lib/features/profileSlicer'; // Adjust the path accordingly
// Adjust the path accordingly
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { userLoginApi } from '@/app/Services/userService';

// Create storage for web and a noop storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// Combine reducers, including RTK Query reducer
const rootReducer = combineReducers({
  profile: profileReducer, // Adjust key name if necessary
  [userLoginApi.reducerPath]: userLoginApi.reducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['profile' ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(userLoginApi.middleware), // Add RTK Query middleware
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Export persistor
