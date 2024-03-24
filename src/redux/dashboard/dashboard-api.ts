import axios from "axios";

const GET_SUBSCRIBERS_API = {
    get: (data: any) =>
        axios.post("/service/getSubscribers", data).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SUBSCRIBERS_DATA_USAGE_API = {
    get: (data: any) =>
        axios.post("/service/getSubscribersDataUsage", data).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SUBSCRIBERS_SESSION_API = {
    get: (data: any) =>
        axios.post("/service/getSubscribersSessions", data).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SUBSCRIBERS_DATA_BUNDLE_API = {
    get: (data: any) =>
        axios.post("/service/getSubscribersDataBundle", data).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SUBSCRIBERS_DATA_ROLLOVER_API = {
    get: (data: any) =>
        axios.post("/service/getSubscribersDataRollover", data).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SUBSCRIBERS_PLAN_API = {
    get: (data: any) =>
        axios.post("/service/getSubscribersPlan", data).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_SUBSCRIBERS_PARAMETER_API = {
    get: (data: any) =>
        axios.post("/service/getSubscribersParameter", data).then((response: { data: any }) => {
            return response.data;
        }),
};
const GET_DEVEICE_WHITE_LIST_API = {
    get: (data: any) =>
        axios.post("/service/getDeviceWhiteList", data).then((response: { data: any }) => {
            return response.data;
        }),
};

const GET_NAS_LIST_API = {
    get: (data: any) =>
        axios.post("/service/getNasList", data).then((response: { data: any }) => {
            return response.data;
        }),
};



export {
    GET_NAS_LIST_API,
    GET_DEVEICE_WHITE_LIST_API,
    GET_SUBSCRIBERS_PARAMETER_API,
    GET_SUBSCRIBERS_API,
    GET_SUBSCRIBERS_DATA_USAGE_API,
    GET_SUBSCRIBERS_SESSION_API,
    GET_SUBSCRIBERS_DATA_BUNDLE_API,
    GET_SUBSCRIBERS_DATA_ROLLOVER_API,
    GET_SUBSCRIBERS_PLAN_API
}
