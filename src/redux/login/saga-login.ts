import {call, put, takeLatest} from 'redux-saga/effects';
import {login, loginError, loginSuccess} from "./login-slice";
import {all} from "axios";
import {USER_LOGIN_API} from "./login-api";

function* handleUserLogin(action: { payload: {} }) {

    try {
        const response: any = yield call(
            USER_LOGIN_API.login,
            action.payload
        );
        yield put(loginSuccess(response));
    } catch (e) {
        yield put(loginError(e));
    }
}

function* watchUserLogin() {
    yield takeLatest<any>(login, handleUserLogin);
}

export default function* LoginSaga() {
    yield all([watchUserLogin()]);
}
