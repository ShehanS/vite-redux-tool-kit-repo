import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";

import {
    addWorklog,
    addWorklogSuccess,
    getPageWorklogs,
    getPageWorklogsSuccess,
    deleteSuccessWorklogSuccess,
    deleteWorklog,
    editWorklog,
    editWorklogSuccess, getError,
    getTypes,
    getTypesSuccess,
    getWorklogs,
    
    getWorklogsSuccess
} from "./worklog-slice";
import {ADD_WORKLOG_API, DELETE_WORKLOG_API, EDIT_WORKLOG_API, GET_Page_WORKLOGS_API, GET_TYPES_API, GET_WORKLOGS_API} from "./worklog-api";


function* handleGetWorklogs(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_WORKLOGS_API.get,
            action.payload
        );
        yield put(getWorklogsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetPageWorklogs(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_Page_WORKLOGS_API.get,
            action.payload
        );
        yield put(getPageWorklogsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddWorklog(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_WORKLOG_API.add,
            action.payload
        );
        yield put(addWorklogSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditWorklog(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_WORKLOG_API.edit,
            action.payload
        );
        yield put(editWorklogSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleDeleteWorklog(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_WORKLOG_API.delete,
            action.payload
        );
        yield put(deleteSuccessWorklogSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetTypes(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_TYPES_API.get,
            action.payload
        );
        yield put(getTypesSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* watchGetTypes() {
    yield takeLatest<any>(getTypes.type, handleGetTypes);
}

function* watchGetDeleteWorklog() {
    yield takeLatest<any>(deleteWorklog.type, handleDeleteWorklog);
}

function* watchGetWorklogs() {
    yield takeLatest<any>(getWorklogs.type, handleGetWorklogs);
}

function* watchGetPageWorklogs() {
    yield takeLatest<any>(getPageWorklogs.type, handleGetPageWorklogs);
}

function* watchAddWorklog() {
    yield takeLatest<any>(addWorklog.type, handleAddWorklog);
}

function* watchEditWorklog() {
    yield takeLatest<any>(editWorklog.type, handleEditWorklog);
}

export default function* WorklogSaga() {
    yield all([watchGetWorklogs(),watchGetPageWorklogs(),, watchAddWorklog(), watchEditWorklog(), watchGetDeleteWorklog(), watchGetTypes()]);
}
