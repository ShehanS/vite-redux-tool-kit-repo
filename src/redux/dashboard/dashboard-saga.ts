import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    GET_DEVEICE_WHITE_LIST_API, GET_NAS_LIST_API,
    GET_SUBSCRIBERS_API,
    GET_SUBSCRIBERS_DATA_BUNDLE_API,
    GET_SUBSCRIBERS_DATA_ROLLOVER_API,
    GET_SUBSCRIBERS_DATA_USAGE_API,
    GET_SUBSCRIBERS_PARAMETER_API,
    GET_SUBSCRIBERS_PLAN_API,
    GET_SUBSCRIBERS_SESSION_API
} from "./dashboard-api";
import {
    getDataBundle,
    getDataBundleError,
    getDataBundleSuccess,
    getDataRollover,
    getDataRolloverError,
    getDataRolloverSuccess,
    getDataUsage,
    getDataUsageError,
    getDataUsageSuccess,
    getDeviceWhiteList,
    getDeviceWhiteListError,
    getDeviceWhiteListSuccess, getNASList, getNASListError, getNASListSuccess,
    getSession,
    getSessionError,
    getSessionSuccess,
    getSubscriberParameter,
    getSubscriberParameterPlanError,
    getSubscriberParameterSuccess,
    getSubscriberPlanError,
    getSubscriberPlanSuccess,
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


function* handleGetSubscribersDataRollover(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBERS_DATA_ROLLOVER_API.get,
            action.payload
        );
        yield put(getDataRolloverSuccess(response));
    } catch (e) {
        yield put(getDataRolloverError(e));
    }
}

function* handleGetSubscribersPlan(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBERS_PLAN_API.get,
            action.payload
        );
        yield put(getSubscriberPlanSuccess(response));
    } catch (e) {
        yield put(getSubscriberPlanError(e));
    }
}

function* handleGetSubscribersParameter(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBERS_PARAMETER_API.get,
            action.payload
        );
        yield put(getSubscriberParameterSuccess(response));
    } catch (e) {
        yield put(getSubscriberParameterPlanError(e));
    }
}

function* handleGetDeviceWhiteList(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_DEVEICE_WHITE_LIST_API.get,
            action.payload
        );
        yield put(getDeviceWhiteListSuccess(response));
    } catch (e) {
        yield put(getDeviceWhiteListError(e));
    }
}


function* handleGetNASList(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_NAS_LIST_API.get,
            action.payload
        );
        yield put(getNASListSuccess(response));
    } catch (e) {
        yield put(getNASListError(e));
    }
}


function* watchGetNASList() {
    yield takeLatest<any>(getNASList.type, handleGetNASList);
}

function* watchGetDeviceWhiteList() {
    yield takeLatest<any>(getDeviceWhiteList.type, handleGetDeviceWhiteList);
}

function* watchGetSubscribersParameter() {
    yield takeLatest<any>(getSubscriberParameter.type, handleGetSubscribersParameter);
}

function* watchGetSubscribersPlan() {
    yield takeLatest<any>(getDataRollover.type, handleGetSubscribersPlan);
}


function* watchGetSubscribersDataRollover() {
    yield takeLatest<any>(getDataRollover.type, handleGetSubscribersDataRollover);
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
    yield all([watchGetSubscribers(), watchGetSubscribersDataUsage(), watchGetSession(), watchGetSubscribersDataBundle(), watchGetSubscribersDataRollover(), watchGetSubscribersPlan(), watchGetSubscribersParameter(), watchGetDeviceWhiteList(), watchGetNASList()]);
}
