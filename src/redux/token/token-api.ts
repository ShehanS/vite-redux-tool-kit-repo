import axios from "axios";
import {queryPrams} from "../../constants/header.config";

const REFRESH_TOKEN_API = {
    get: () =>
        axios.post(`/token-service/oauth/v2/token`, null, {
            params: queryPrams
        }).then((response: { data: any }) => {
            return response.data;
        }),
};

export {REFRESH_TOKEN_API}
