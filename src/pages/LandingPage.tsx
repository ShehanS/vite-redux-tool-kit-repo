import {FC, useEffect, useState} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import {useNavigate} from "react-router-dom"
import {RootState} from "../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {Box} from "@mui/joy";
import TaskCreateBar from "../components/TaskCreateBar";

type StateObj = {
    user: any;
    taskListResponse: any;
    projectListResponse: any;

};
type ReduxProps = ConnectedProps<typeof connector>;

const LandingPage: FC<ReduxProps> = (props) => {
    const navigate = useNavigate();
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        user: null,
        taskListResponse: null,
        projectListResponse: null
    });
    useEffect(() => {
        if (
            (stateObj.user === null && appDataContext.user !== null) ||
            stateObj.user !== appDataContext.user
        ) {
            setStateObj({...stateObj, user: appDataContext.user});
        }
        if (
            (stateObj.taskListResponse === null && props.taskListResponse !== null) ||
            stateObj.taskListResponse !== props.taskListResponse
        ) {
            setStateObj({...stateObj, taskList: props.taskListResponse});
        }
        if (
            (stateObj.projectListResponse === null && props.projectListResponse !== null) ||
            stateObj.projectListResponse !== props.projectListResponse
        ) {
            setStateObj({...stateObj, projectListResponse: props.projectListResponse});
        }
    }, [appDataContext.user, props.taskListResponse, props.projectListResponse])


    return (
        <>

            <Box>
                <TaskCreateBar/>
            </Box>
            {/*<Button onClick={loadTask}>Load Tasks</Button>*/}

            {/*<Box>*/}
            {/*    {stateObj?.taskList?.data?.map((task) => (*/}
            {/*        <TaskViewCard task={task}/>*/}
            {/*    ))}*/}
            {/*</Box>*/}


        </>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        refreshTokenPayload: state.token.refreshTokenPayload,
        refreshTokenError: state.token.error,
        taskListResponse: state.task.taskListResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
