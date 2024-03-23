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


export {GET_SUBSCRIBERS_API, GET_SUBSCRIBERS_DATA_USAGE_API, GET_SUBSCRIBERS_SESSION_API, GET_SUBSCRIBERS_DATA_BUNDLE_API}
