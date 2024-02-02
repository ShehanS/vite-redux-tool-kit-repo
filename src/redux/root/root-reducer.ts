import loginReducer from "../login/login-slice";
import {combineReducers} from "@reduxjs/toolkit";
import counterReducer from "../login/counter-slice";
import tokenReducer from "../token/token-slice"
import taskReducer from "../task/task-slice"
import worklogReducer from "../worklog/worklog-slice"

const rootReducer = combineReducers({
    counter: counterReducer,
    login: loginReducer,
    token: tokenReducer,
    task: taskReducer,
    worklog: worklogReducer
});

export default rootReducer;
