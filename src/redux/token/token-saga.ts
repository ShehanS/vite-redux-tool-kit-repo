import { all, call, put, takeLatest, take } from "redux-saga/effects";
import {REFRESH_TOKEN_API} from "./token-api";
import {ServerResponse} from "http";
import {getToken, getTokenError, getTokenSuccess} from "./token-slice";


function* handleGetToken() {
    try {
        const response: ServerResponse = yield call(
            REFRESH_TOKEN_API.get
        );
        yield put(getTokenSuccess(response));
    } catch (e) {
        yield put(getTokenError(e));
    }
}

function* watchGetToken() {
    yield takeLatest<any>(getToken.type, handleGetToken);
}

export default function* TokenSaga() {
    yield all([watchGetToken()]);
}
