import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export interface DashboardState {
    request: any;
    subscriberResponse: any;
    dataUsageResponse: any;
    sessionResponse: any;
    dataBundleResponse: any;
    isLoading: boolean;
}

const initialState: DashboardState = {
    request: null,
    subscriberResponse: null,
    dataUsageResponse: null,
    sessionResponse: null,
    dataBundleResponse: null,
    isLoading: false
}


export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        getSubscribers: (state, action: PayloadAction<any>) => ({
            ...state,
            isLoading: true,
            request: action.payload
        }),
        getSubscribersSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            subscriberResponse: action.payload,
            isLoading: false
        }),
        getSubscribersError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),

        getDataUsage: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getDataUsageSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dataUsageResponse: action.payload,
            isLoading: false
        }),
        getDataUsageError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),
        getSession: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getSessionSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            sessionResponse: action.payload,
            isLoading: false
        }),
        getSessionError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),
        getDataBundle: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getDataBundleSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dataBundleResponse: action.payload,
            isLoading: false
        }),
        getDataBundleError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),

    }
});
export const {
    getSubscribers,
    getSubscribersSuccess,
    getSubscribersError,
    getDataUsage,
    getDataUsageSuccess,
    getDataUsageError,
    getSession,
    getSessionSuccess,
    getSessionError,
    getDataBundle,
    getDataBundleSuccess,
    getDataBundleError




} = dashboardSlice.actions
export default dashboardSlice.reducer
