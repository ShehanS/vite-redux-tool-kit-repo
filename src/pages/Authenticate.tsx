import {FC, ReactNode, useEffect, useState} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {clearTokenError, getToken} from "../redux/token/token-slice";
import Dialog from "../components/Dialog";
import TokenDialog, {DialogType} from "../components/Dialogs/TokenDialog";
import axios from "axios";
import {googleLogout} from "@react-oauth/google";

type OwnProps = {
    children: ReactNode;
};

type StateObj = {
    user: any;
    refreshTokenError: any;
    refreshTokenPayload: any;

};

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

const Authenticate: FC<Props> = (props) => {
    const [stateObj, setStateObj] = useState<StateObj>({
        user: null,
        refreshTokenError: null,
        refreshTokenPayload: null
    });
    const navigate = useNavigate();
    const {appDataContext, setAppDataContext} = useAppDataContext();


    axios.interceptors.request.use(
        (config) => {
            if (appDataContext.refreshToken !== "") {
                config.headers['Authorization'] = `Zoho-oauthtoken ${stateObj.refreshTokenPayload?.access_token}`;
                //config.headers['Authorization'] = `Zoho-oauthtoken 1000.d69ceb2915b01d1110eded5daf4ffa9b.f1058efacc1798a08837a251158fa102`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        (response) => {
            if (response.data?.responseCode === "REFRESH_TOKEN_HAS_EXPIRED") {
                setAppDataContext({
                    ...appDataContext,
                    dialogTitle: "Token Validation",
                    isOpenDialog: true,
                    dialogContent: <TokenDialog type={DialogType.error} showLogout={true}/>
                });

            }
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    useEffect(() => {

        if (
            (stateObj.user === null && appDataContext.user !== null) ||
            stateObj.user !== appDataContext.user
        ) {
            setStateObj({...stateObj, user: appDataContext.user});
        }

    }, [appDataContext.user]);


    useEffect(() => {
        if (
            (stateObj.refreshTokenError === null && props.refreshTokenError !== null) ||
            stateObj.refreshTokenError !== props.refreshTokenError
        ) {
            setStateObj({...stateObj, refreshTokenError: props.refreshTokenError});
            setAppDataContext({
                ...appDataContext,
                dialogTitle: "Token Issue Limited",
                isOpenDialog: true,
                dialogContent: <TokenDialog type={DialogType.limited} showLogout={true}/>
            });
            setTimeout(()=>{
                googleLogout();
                navigate("/login", {replace: true})
            }, 5000)
        }

    }, [props.refreshTokenError]);


    useEffect(() => {
        if (
            (stateObj.refreshTokenPayload === null &&
                props.refreshTokenPayload !== null) ||
            stateObj.refreshTokenPayload !== props.refreshTokenPayload
        ) {
            setStateObj({...stateObj, refreshTokenPayload: props.refreshTokenPayload});
            props.clearTokenError();
            setAppDataContext({
                ...appDataContext,
                refreshToken: props.refreshTokenPayload?.access_token,
                isOpenDialog: false,
            });
        }
    }, [props.refreshTokenPayload]);


    useEffect(() => {
        if (appDataContext.user === null) {
            navigate("/login", {replace: true});
        } else {
            setAppDataContext({
                ...appDataContext,
                isOpenDialog: true,
                dialogTitle: "Token Request",
                dialogContent: <TokenDialog type={DialogType.success}/>
            });
            props.onGetToken();
        }
    }, []);

    return <>
        <Dialog/>
        {props.children}</>;
};

const mapStateToProps = (state: RootState) => {
    return {
        refreshTokenPayload: state.token.refreshTokenPayload,
        refreshTokenError: state.token.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetToken: () => dispatch(getToken()),
        clearTokenError:() => dispatch(clearTokenError(null))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Authenticate);
