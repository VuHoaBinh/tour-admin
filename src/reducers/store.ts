import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { default as storage } from 'redux-persist/lib/storage';
import notification from './notificationSlice';
import profile from './profileSlice';

const rootReducer = combineReducers({
  [notification.name]: notification.reducer,
  [profile.name]: profile.reducer,
});

const persistedReducer = persistReducer({ key: 'root', storage }, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
