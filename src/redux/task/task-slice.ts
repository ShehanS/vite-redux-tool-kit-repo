import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'


export interface TaskState {
    taskListResponse: any;
    error: any;
    payload: any;
    projectListResponse: any;
    projectResponse: any;
    ownerResponse: any;
    statusResponse: any;
    priorityResponse: any;
    addTaskResponse: any;
    projectId: string;
    body: any;
}

const initialState: TaskState = {
    taskListResponse: null,
    error: null,
    payload: null,
    projectListResponse: null,
    projectResponse: null,
    ownerResponse: null,
    statusResponse: null,
    priorityResponse: null,
    addTaskResponse: null,
    projectId:"",
    body: null

}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getTask: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        getTaskSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            taskListResponse: action.payload
        }),
        getTaskError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getProject: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        getProjectSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            projectListResponse: action.payload
        }),
        getProjectError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        getProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            projectResponse: action.payload
        }),
        getProjectByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getOwnersByProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        getOwnersByProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            ownerResponse: action.payload
        }),
        getOwnersByProjectByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getPriorityByProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        getPriorityByProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            priorityResponse: action.payload
        }),
        getPriorityByProjectByIdByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getStatusByProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        getStatusByProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            statusResponse: action.payload
        }),
        getStatusByProjectByIdByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        addTask: (state, action: PayloadAction<any>) => ({
            ...state,
            projectId: action.projectId,
            body: action.payload
        }),
        addTaskSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            statusResponse: action.payload
        }),
        addTaskError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),


    },
})

export const {
    getTask,
    getTaskSuccess,
    getTaskError,
    getProject,
    getProjectSuccess,
    getProjectError,
    getProjectById,
    getProjectByIdSuccess,
    getProjectByIdError,
    getOwnersByProjectById,
    getOwnersByProjectByIdSuccess,
    getOwnersByProjectByIdError,
    getPriorityByProjectById,
    getPriorityByProjectByIdSuccess,
    getPriorityByProjectByIdByIdError,
    getStatusByProjectById,
    getStatusByProjectByIdSuccess,
    getStatusByProjectByIdByIdError,
    addTask,
    addTaskSuccess,
    addTaskError


} = taskSlice.actions
export default taskSlice.reducer
