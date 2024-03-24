import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export interface DashboardState {
    request: any;
    subscriberResponse: any;
    dataUsageResponse: any;
    sessionResponse: any;
    dataBundleResponse: any;
    dataRollOverResponse: any;
    subscriberPlanResponse: any;
    subscriberParameterResponse: any;
    deviceWhiteListResponse: any;
    nasListResponse: any;
    isLoading: boolean;
}

const initialState: DashboardState = {
    request: null,
    subscriberResponse: null,
    dataUsageResponse: null,
    sessionResponse: null,
    dataBundleResponse: null,
    isLoading: false,
    dataRollOverResponse: null,
    subscriberParameterResponse: null,
    deviceWhiteListResponse: null,
    subscriberPlanResponse: null,
    nasListResponse: null
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
        getDataRollover: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getDataRolloverSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dataRollOverResponse: action.payload,
            isLoading: false
        }),
        getDataRolloverError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),
        getSubscriberPlan: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getSubscriberPlanSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            subscriberPlanResponse: action.payload,
            isLoading: false
        }),
        getSubscriberPlanError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),
        getSubscriberParameter: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getSubscriberParameterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            subscriberParameterResponse: action.payload,
            isLoading: false
        }),
        getSubscriberParameterPlanError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),
        getDeviceWhiteList: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getDeviceWhiteListSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            deviceWhiteListResponse: action.payload,
            isLoading: false
        }),
        getDeviceWhiteListError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),
        getNASList: (state, action: PayloadAction<any>) => ({
            ...state,
            request: action.payload,
            isLoading: true
        }),
        getNASListSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            nasListResponse: action.payload,
            isLoading: false
        }),
        getNASListError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            isLoading: false
        }),


    }
});
export const {
    getNASList,
    getNASListSuccess,
    getNASListError,
    getDeviceWhiteList,
    getDeviceWhiteListSuccess,
    getDeviceWhiteListError,
    getSubscriberParameter,
    getSubscriberParameterSuccess,
    getSubscriberParameterPlanError,
    getSubscriberPlan,
    getSubscriberPlanSuccess,
    getSubscriberPlanError,
    getDataRollover,
    getDataRolloverSuccess,
    getDataRolloverError,
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
