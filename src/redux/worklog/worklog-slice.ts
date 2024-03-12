import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {ISnackBar} from "../../interfaces/ISnackBar";


export interface TaskState {
    getWorklogsResponse: any;
    addWorklogResponse: any;
    editWorklogResponse: any;
    deleteWorklogResponse: any;
    error: any;
    worklogId: string;
    payload: any;
    projectId: string;
    taskId: string,
    isLoading: boolean;
    typesResponse: any;
    showSnackBar: ISnackBar;
    
    getPageWorklogsResponse: any;
}

const initialState: TaskState = {
    typesResponse: null,
    getWorklogsResponse: null,
    addWorklogResponse: null,
    editWorklogResponse: null,
    deleteWorklogResponse: null,
    error: null,
    worklogId: "",
    payload: "",
    projectId: "",
    taskId: "",
    isLoading: false,
    showSnackBar: {
        message: "",
        title: "",
        isOpen: false,
        variant: "solid",
        color: "primary"
    },

    getPageWorklogsResponse: null,
}

export const worklogSlice = createSlice({
    name: 'worklog',
    initialState,
    reducers: {
        getWorklogs: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getWorklogsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            getWorklogsResponse: action.payload,
            error: null
        }),

        getPageWorklogs: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getPageWorklogsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            getPageWorklogsResponse: action.payload,
            error: null
        }),
        

        addWorklog: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
        }),
        addWorklogSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            addWorklogResponse: action.payload,
            error: null
        }),
        editWorklog: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editWorklogSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            editWorklogResponse: action.payload,

        }),
        deleteWorklog: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteSuccessWorklogSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            deleteWorklogResponse: action.payload,
            error: null
        }),
        getTypes: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getTypesSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            typesResponse: action.payload,
            error: null
        }),
        getError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
        clearHistory: (state)=>({
            ...state,
            typesResponse: null,
            getWorklogsResponse: null,
            addWorklogResponse: null,
            editWorklogResponse: null,
            deleteWorklogResponse: null,
            error: null,
            worklogId: "",
            payload: "",
            projectId: "",
            taskId: "",
            isLoading: false,
            showSnackBar: {
                message: "",
                title: "",
                isOpen: false,
                variant: "solid",
                color: "primary"
            }

        })

    },
})

export const {
    getError,
    clearHistory,
    getWorklogs,
    getWorklogsSuccess,
    getPageWorklogs, 
    getPageWorklogsSuccess,
    addWorklog,
    addWorklogSuccess,
    editWorklog,
    editWorklogSuccess,
    deleteWorklog,
    deleteSuccessWorklogSuccess,
    getTypes,
    getTypesSuccess

} = worklogSlice.actions
export default worklogSlice.reducer
