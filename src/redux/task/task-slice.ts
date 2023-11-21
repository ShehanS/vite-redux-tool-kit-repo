import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {ISnackBar} from "../../interfaces/ISnackBar";


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
    updateTaskResponse: any;
    getTaskResponse: any;
    projectId: string;
    taskId: string,
    newTask: any;
    isLoading: boolean;
    showSnackBar: ISnackBar,
    deleteTaskResponse: any;
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
    getTaskResponse: null,
    projectId: "",
    taskId: "",
    updateTaskResponse: null,
    newTask: null,
    isLoading: false,
    deleteTaskResponse: null,
    showSnackBar: {
        message: "",
        title: "",
        isOpen: false,
        variant: "solid",
        color: "primary"
    }

}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getTask: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getTaskSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            taskListResponse: action.payload,
            error: null
        }),
        getTaskError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
        }),
        getProject: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getProjectSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            projectListResponse: action.payload,
            error: null
        }),
        getProjectError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,

        }),
        getProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            projectResponse: action.payload,
            error: null
        }),
        getProjectByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getOwnersByProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getOwnersByProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            ownerResponse: action.payload,
            error: null
        }),
        getOwnersByProjectByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getPriorityByProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getPriorityByProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            priorityResponse: action.payload,
            error: null
        }),
        getPriorityByProjectByIdByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        getStatusByProjectById: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getStatusByProjectByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            statusResponse: action.payload,
            error: null
        }),
        getStatusByProjectByIdByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        addTask: (state, action: PayloadAction<{ payload: any, projectId: string }>) => ({
            ...state,
            projectId: action.projectId,
            newTask: action.payload,
            error: null
        }),
        addTaskSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            addTaskResponse: action.payload ?? null,
            error: null
        }),
        addTaskError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),

        updateTask: (state, action: PayloadAction<{ payload: any, projectId: string, taskId: string }>) => ({
            ...state,
            projectId: action.projectId,
            taskId: action.taskId,
            updateTask: action.payload,
            error: null
        }),
        updateTaskSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            updateTaskResponse: action.payload ?? null,
            error: null
        }),
        updateTaskTaskError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        updateTaskSuccessClear: (state) => ({
            ...state,
            error: null,
            updateTaskResponse: null
        }),

        setLoader: (state, action: PayloadAction<boolean>) => ({
            ...state,
            isLoading: action.payload,
            error: null
        }),
        setSnackBar: (state, action: PayloadAction<ISnackBar>) => ({
            ...state,
            showSnackBar: action.payload,
            error: null
        }),
        setResetState: (state) => ({
            ...state,
            addTaskResponse: null
        }),
        getTaskById: (state, action: PayloadAction<{ projectId: string, taskId: string }>) => ({
            ...state,
            projectId: action.projectId,
            taskId: action.taskId,
            error: null
        }),
        getTaskByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            getTaskResponse: action.payload ?? null,
            error: null
        }),
        getTaskByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null
        }),
        deleteTaskById: (state, action: PayloadAction<{ projectId: string, taskId: string }>) => ({
            ...state,
            projectId: action.projectId,
            taskId: action.taskId,
            error: null
        }),
        deleteTaskByIdSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            deleteTaskResponse: action.payload ?? null,
            error: null
        }),
        deleteTaskByIdError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null
        }),
        deleteTaskByIdResponseClear: (state) => ({
            ...state,
            deleteTaskResponse: null,
            error: null
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
    addTaskError,
    setLoader,
    setSnackBar,
    setResetState,
    updateTask,
    updateTaskSuccess,
    updateTaskTaskError,
    updateTaskSuccessClear,
    getTaskById,
    getTaskByIdSuccess,
    getTaskByIdError,
    deleteTaskById,
    deleteTaskByIdSuccess,
    deleteTaskByIdError,
    deleteTaskByIdResponseClear


} = taskSlice.actions
export default taskSlice.reducer
