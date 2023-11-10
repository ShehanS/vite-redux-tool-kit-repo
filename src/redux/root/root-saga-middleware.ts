import createSagaMiddleware from 'redux-saga';
import UserLoginSaga from "../login/login-saga";
import TokenSaga from "../token/token-saga";

const sagaMiddleware = createSagaMiddleware();

export const runRootSagaMiddleware = () => {
    sagaMiddleware.run(UserLoginSaga);
    sagaMiddleware.run(TokenSaga);

};

export default sagaMiddleware;
