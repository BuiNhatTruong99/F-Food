import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userSlice from './user/userSlice';

const persistConfig = {
    key: 'FFood',
    storage,
};

const userConfig = {
    ...persistConfig,
    whitelist: ['isLoggedIn', 'accessToken', 'current'],
};

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: persistReducer(userConfig, userSlice),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: false,
});

export const persistor = persistStore(store);
