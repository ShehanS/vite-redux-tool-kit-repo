import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_LOGIN_API} from "./login-api";
import {ServerResponse} from "http";
import {login, loginError, loginSuccess} from "./login-slice";



function* handleLogin(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            USER_LOGIN_API.login,
            action.payload
        );
        yield put(loginSuccess(response));
    } catch (e) {
        yield put(loginError(e));
    }
}

function* watchLogin() {
    yield takeLatest<any>(login.type, handleLogin);
}

export default function* UserLoginSaga() {
    yield all([watchLogin()]);
}
