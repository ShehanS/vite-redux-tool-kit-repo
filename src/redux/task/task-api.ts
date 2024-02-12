import axios from "axios";

const GET_TASKSLIST_API = {
  get: (payload: any) =>
    axios
      .post(`/api/engine/get-tasks`, payload)
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const GET_TASK_API = {
  get: (payload: any) =>
    axios
      .post(`/api/engine/get-task-project-id`, payload)
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const GET_PROJECTS_API = {
  get: (payload: any) =>
    axios
      .post(`/api/engine/get-projects`, payload)
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const GET_PROJECTS_BY_ID_API = {
  get: (payload: any) =>
    axios
      .post(`/api/engine/get-project-by-id`, payload)
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const GET_OWNER_BY_PROJECT_ID_API = {
  get: (payload: any) =>
    axios
      .post(`/api/engine/get-owner-by-id`, payload)
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const GET_PRIORITIES_BY_PROJECT_ID_API = {
  get: (payload: any) =>
    axios
      .post(`/api/engine/get-priority-by-id`, payload)
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const GET_STATUS_BY_PROJECT_ID_API = {
  get: (payload: any) =>
    axios
      .post(`/api/engine/get-status-by-id`, payload)
      .then((response: { data: any }) => {
        return response.data;
      }),
};
const ADD_TASK_API = {
  add: (payload: any) =>
    axios
      .post(
        `/api/engine/projects/${payload.projectId}/add-task`,
        payload.payload
      )
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const UPDATE_TASK_API = {
  add: (payload: any) =>
    axios
      .post(
        `/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}`,
        payload.payload
      )
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const GET_TASK_BY_ID_API = {
  get: (payload: any) =>
    axios
      .get(`/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}`)
      .then((response: { data: any }) => {
        return response.data;
      }),
};

const DELETE_TASK_BY_ID_API = {
  get: (payload: any) =>
    axios
      .delete(
        `/api/engine/projects/${payload.projectId}/tasks/${payload.taskId}`
      )
      .then((response: { data: any }) => {
        return response.data;
      }),
};

export {
  GET_TASK_API,
  GET_PROJECTS_API,
  GET_PROJECTS_BY_ID_API,
  GET_OWNER_BY_PROJECT_ID_API,
  GET_PRIORITIES_BY_PROJECT_ID_API,
  GET_STATUS_BY_PROJECT_ID_API,
  ADD_TASK_API,
  UPDATE_TASK_API,
  GET_TASK_BY_ID_API,
  DELETE_TASK_BY_ID_API,
  GET_TASKSLIST_API,
};
