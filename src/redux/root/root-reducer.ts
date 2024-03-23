import loginReducer from "../login/login-slice";
import {combineReducers} from "@reduxjs/toolkit";
import dashboardReducer from "../dashboard/dashboard-slice";


const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    login: loginReducer
});

export default rootReducer;
