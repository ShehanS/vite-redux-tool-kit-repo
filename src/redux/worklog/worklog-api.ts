import axios from "axios";

const GET_WORKLOGS_API = {
    get: (payload: any) =>
        axios.get(`/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}/worklogs`).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_Page_WORKLOGS_API = {
    get: (payload: { projectId: string, taskId: string, pageIndex: number, pageSize: number }) =>
        axios.get(`/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}/page-worklogs`, {
            params: {
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize
            }
        }).then((response: { data: any }) => {
            return response.data;
        }),
};

const ADD_WORKLOG_API = {
    add: (payload: any) =>
        axios.post(`/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}/add-worklog`, payload.payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const EDIT_WORKLOG_API = {
    edit: (payload: any) =>
        axios.post(`/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}/worklogs/${payload.worklogId}/edit-worklog`, payload.payload).then((response: { data: any }) => {
            return response.data;
        }),
};

const DELETE_WORKLOG_API = {
    delete: (payload: any) =>
        axios.delete(`/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}/worklogs/${payload.worklogId}/delete`, payload.payload).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_TYPES_API = {
    get: (payload: any) =>
        axios.get(`/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}/worklog-types`).then((response: { data: any }) => {
            return response.data;
        }),
};


export {
    GET_TYPES_API,
    GET_Page_WORKLOGS_API,
    GET_WORKLOGS_API,
    ADD_WORKLOG_API,
    EDIT_WORKLOG_API,
    DELETE_WORKLOG_API

}
