import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import rootReducer from "./root/root-reducer";
import sagaMiddleware, {runRootSagaMiddleware} from "./root/root-saga-middleware";

const loggerMiddleware = createLogger();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, loggerMiddleware),
});

runRootSagaMiddleware();
export type RootState = ReturnType<typeof store.getState>;
