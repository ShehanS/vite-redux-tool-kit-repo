import {all, call, put, takeLatest} from "redux-saga/effects";
import {USER_LOGIN_API} from "./login-api";
import {login, loginError, loginSuccess} from "./login-slice";
import {ServerResponse} from "http";


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
