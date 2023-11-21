import {FC, ReactNode, useEffect, useState} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {getToken} from "../redux/token/token-slice";
import Dialog from "../components/Dialog";
import TokenDialog, {DialogType} from "../components/Dialogs/TokenDialog";
import axios from "axios";

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
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: true,
                    dialogContent: <TokenDialog type={DialogType.success}/>
                });
                props.onGetToken();
            }
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

        if (
            (stateObj.refreshTokenError === null && props.refreshTokenError !== null) ||
            stateObj.refreshTokenError !== props.refreshTokenError
        ) {
            setStateObj({...stateObj, refreshTokenError: props.refreshTokenError});
            setAppDataContext({
                ...appDataContext,
                isOpenDialog: true,
                dialogContent: <TokenDialog type={DialogType.limited}/>,
            });
        }

        if (
            (stateObj.refreshTokenPayload === null &&
                props.refreshTokenPayload !== null) ||
            stateObj.refreshTokenPayload !== props.refreshTokenPayload
        ) {
            setStateObj({...stateObj, refreshTokenPayload: props.refreshTokenPayload});
            setAppDataContext({
                ...appDataContext,
                refreshToken: props.refreshTokenPayload?.access_token,
                isOpenDialog: false,
            });
        }
    }, [appDataContext.user, props.refreshTokenError, props.refreshTokenPayload]);


    useEffect(() => {
        if (appDataContext.user === null) {
            navigate("/login", {replace: true});
        } else {
            setAppDataContext({
                ...appDataContext,
                isOpenDialog: true,
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
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Authenticate);
