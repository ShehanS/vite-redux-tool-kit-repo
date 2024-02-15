import createSagaMiddleware from 'redux-saga';
import UserLoginSaga from "../login/login-saga";
import TokenSaga from "../token/token-saga";
import TaskSaga from "../task/task-saga";
import WorklogSaga from "../worklog/worklog-saga";

const sagaMiddleware = createSagaMiddleware();

export const runRootSagaMiddleware = () => {
    sagaMiddleware.run(UserLoginSaga);
    sagaMiddleware.run(TokenSaga);
    sagaMiddleware.run(TaskSaga);
    sagaMiddleware.run(WorklogSaga)

};

export default sagaMiddleware;
