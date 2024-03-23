import createSagaMiddleware from 'redux-saga';
import LoginSaga from "../login/saga-login";
import DashboardSaga from "../dashboard/dashboard-saga";

const sagaMiddleware = createSagaMiddleware();

export const runRootSagaMiddleware = () => {
    sagaMiddleware.run(LoginSaga);
    sagaMiddleware.run(DashboardSaga)
};

export default sagaMiddleware;
