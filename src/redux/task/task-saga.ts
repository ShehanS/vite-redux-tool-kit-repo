import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    addTask,
    addTaskError,
    addTaskSuccess,
    getOwnersByProjectById,
    getOwnersByProjectByIdError,
    getOwnersByProjectByIdSuccess,
    getPriorityByProjectById,
    getPriorityByProjectByIdByIdError,
    getPriorityByProjectByIdSuccess,
    getProject,
    getProjectById,
    getProjectByIdError,
    getProjectByIdSuccess,
    getProjectError,
    getProjectSuccess,
    getStatusByProjectById,
    getStatusByProjectByIdByIdError,
    getStatusByProjectByIdSuccess,
    getTask,
    getTaskError,
    getTaskSuccess
} from "./task-slice";
import {
    ADD_TASK_API,
    GET_OWNER_BY_PROJECT_ID_API,
    GET_PRIORITIES_BY_PROJECT_ID_API,
    GET_PROJECTS_API,
    GET_PROJECTS_BY_ID_API,
    GET_STATUS_BY_PROJECT_ID_API,
    GET_TASK_API
} from "./task-api";


function* handleGetTask(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_TASK_API.get,
            action.payload
        );
        yield put(getTaskSuccess(response));
    } catch (e) {
        yield put(getTaskError(e));
    }
}

function* handleGetProjects(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_PROJECTS_API.get,
            action.payload
        );
        yield put(getProjectSuccess(response));
    } catch (e) {
        yield put(getProjectError(e));
    }
}

function* handleGetProjectById(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_PROJECTS_BY_ID_API.get,
            action.payload
        );
        yield put(getProjectByIdSuccess(response));
    } catch (e) {
        yield put(getProjectByIdError(e));
    }
}

function* handleGetOwnersByProjectId(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_OWNER_BY_PROJECT_ID_API.get,
            action.payload
        );
        yield put(getOwnersByProjectByIdSuccess(response));
    } catch (e) {
        yield put(getOwnersByProjectByIdError(e));
    }
}

function* handleGetPrioritiesByProjectId(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_PRIORITIES_BY_PROJECT_ID_API.get,
            action.payload
        );
        yield put(getPriorityByProjectByIdSuccess(response));
    } catch (e) {
        yield put(getPriorityByProjectByIdByIdError(e));
    }
}

function* handleGetStatusByProjectId(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_STATUS_BY_PROJECT_ID_API.get,
            action.payload
        );
        yield put(getStatusByProjectByIdSuccess(response));
    } catch (e) {
        yield put(getStatusByProjectByIdByIdError(e));
    }
}

function* handleAddTask(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_TASK_API.add(action.payload?.payload, action.payload?.projectId)
        );
        yield put(addTaskSuccess(response));
    } catch (e) {
        yield put(addTaskError(e));
    }
}

function* watchGetTask() {
    yield takeLatest<any>(getTask.type, handleGetTask);
}

function* watchGetProjects() {
    yield takeLatest<any>(getProject.type, handleGetProjects);
}

function* watchGetGetProjectById() {
    yield takeLatest<any>(getProjectById.type, handleGetProjectById);
}

function* watchGetStatusByProjectId() {
    yield takeLatest<any>(getStatusByProjectById.type, handleGetStatusByProjectId);
}

function* watchAddTask() {
    yield takeLatest<any>(addTask.type, handleAddTask);
}


function* watchGetPrioritiesByProjectId() {
    yield takeLatest<any>(getPriorityByProjectById.type, handleGetPrioritiesByProjectId);
}

function* watchGetGetOwnersByProjectId() {
    yield takeLatest<any>(getOwnersByProjectById.type, handleGetOwnersByProjectId);
}

export default function* TaskSaga() {
    yield all([watchGetTask(), watchGetProjects(), watchGetGetProjectById(), watchGetGetOwnersByProjectId(), watchGetPrioritiesByProjectId(), watchGetStatusByProjectId(), watchAddTask()]);
}
