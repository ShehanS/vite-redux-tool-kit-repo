import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    GET_SUBSCRIBERS_API,
    GET_SUBSCRIBERS_DATA_BUNDLE_API,
    GET_SUBSCRIBERS_DATA_USAGE_API,
    GET_SUBSCRIBERS_SESSION_API
} from "./dashboard-api";
import {
    getDataBundle, getDataBundleError, getDataBundleSuccess,
    getDataUsage,
    getDataUsageError,
    getDataUsageSuccess,
    getSession,
    getSessionError,
    getSessionSuccess,
    getSubscribers,
    getSubscribersError,
    getSubscribersSuccess
} from "./dashboard-slice";


function* handleGetSession(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBERS_SESSION_API.get,
            action.payload
        );
        yield put(getSessionSuccess(response));
    } catch (e) {
        yield put(getSessionError(e));
    }
}

function* handleGetSubscribers(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBERS_API.get,
            action.payload
        );
        yield put(getSubscribersSuccess(response));
    } catch (e) {
        yield put(getSubscribersError(e));
    }
}

function* handleGetSubscribersDataUsage(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBERS_DATA_USAGE_API.get,
            action.payload
        );
        yield put(getDataUsageSuccess(response));
    } catch (e) {
        yield put(getDataUsageError(e));
    }
}

function* handleGetSubscribersDataBundle(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBERS_DATA_BUNDLE_API.get,
            action.payload
        );
        yield put(getDataBundleSuccess(response));
    } catch (e) {
        yield put(getDataBundleError(e));
    }
}


function* watchGetSubscribersDataBundle() {
    yield takeLatest<any>(getDataBundle.type, handleGetSubscribersDataBundle);
}

function* watchGetSession() {
    yield takeLatest<any>(getSession.type, handleGetSession);
}

function* watchGetSubscribersDataUsage() {
    yield takeLatest<any>(getDataUsage.type, handleGetSubscribersDataUsage);
}


function* watchGetSubscribers() {
    yield takeLatest<any>(getSubscribers.type, handleGetSubscribers);
}

export default function* DashboardSaga() {
    yield all([watchGetSubscribers(), watchGetSubscribersDataUsage(), watchGetSession(), watchGetSubscribersDataBundle()]);
}
