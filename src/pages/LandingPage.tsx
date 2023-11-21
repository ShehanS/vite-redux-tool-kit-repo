import React, {FC, useEffect, useState} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import {useNavigate} from "react-router-dom"
import {RootState} from "../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {Box, CircularProgress, Grid, Stack, Typography} from "@mui/joy";
import TaskCreateBar from "../components/TaskCreateBar";
import TaskViewer from "../components/TaskViewer";
import {setLoader} from "../redux/task/task-slice";
import {TablePagination} from "@mui/material";

type StateObj = {
    user: any;
    taskListResponse: any;
    projectListResponse: any;
    addTaskResponse: any;

};
type ReduxProps = ConnectedProps<typeof connector>;

const LandingPage: FC<ReduxProps> = (props) => {
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [taskList, setTaskList] = useState<any[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>({
        user: null,
        taskListResponse: null,
        projectListResponse: null,
        addTaskResponse: null
    });
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
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
            setStateObj({...stateObj, taskListResponse: props.taskListResponse});
            props.onSetLoader(false);
            if (props.taskListResponse?.responseCode === "GET_TASK_LIST_SUCCESS") {
                setTaskList(props.taskListResponse?.data)
            }
        }
        if (
            (stateObj.projectListResponse === null && props.projectListResponse !== null) ||
            stateObj.projectListResponse !== props.projectListResponse
        ) {
            setStateObj({...stateObj, projectListResponse: props.projectListResponse});

        }
    }, [appDataContext.user, props.taskListResponse, props.projectListResponse])

    useEffect(() => {
        if (
            (stateObj.addTaskResponse === null && props.addTaskResponse !== null) ||
            stateObj.addTaskResponse !== props.addTaskResponse
        ) {
            setStateObj({...stateObj, addTaskResponse: props.addTaskResponse});
            if (props.addTaskResponse?.responseCode === "TASK_ADD_SUCCESS") {

            }

        }

    }, [props.addTaskResponse]);


    const handleResizeTaskList = (event: any) => {

    }

    return (
        <>
            <Box>
                <TaskCreateBar/>
            </Box>
            <Box>
                <Grid container spacing={2} sx={{flexGrow: 1}}>
                    <Grid lg={6} md={6} sm={12}>
                        <Box sx={{position: 'absolute', marginTop: 10, width: '40%'}}
                             onMouseMove={handleResizeTaskList}>
                            <Stack><Typography color={"success"} level={"title-lg"}>Tasks:</Typography></Stack>
                            {props.isLoading === false ? <Box sx={{overflowY: 'auto', height: '600px',}}>
                                {taskList?.map((task: any, index: number) => (
                                    <TaskViewer key={index} task={task}/>
                                ))}
                            </Box> : <Stack sx={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}>
                                <CircularProgress
                                    color="neutral"
                                    determinate={false}
                                    size="sm"
                                />
                            </Stack>}
                            <TablePagination
                                component="div"
                                count={100}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Grid>
                    <Grid lg={6} md={6} sm={12}>
                        <Box sx={{position: 'absolute'}}>
                            Test
                        </Box>
                    </Grid>
                </Grid>
            </Box>


        </>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        refreshTokenPayload: state.token.refreshTokenPayload,
        refreshTokenError: state.token.error,
        taskListResponse: state.task.taskListResponse,
        isLoading: state.task.isLoading,
        addTaskResponse: state.task.addTaskResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSetLoader: (payload: boolean) => dispatch(setLoader(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
