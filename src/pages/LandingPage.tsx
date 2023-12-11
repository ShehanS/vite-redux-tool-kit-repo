import React, {FC, useEffect, useState} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import {useNavigate} from "react-router-dom"
import {RootState} from "../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {Box, Chip, IconButton, Sheet, Stack, Table, Typography} from "@mui/joy";
import TaskCreateBar from "../components/MainBar";
import {getTask, setLoader, setSnackBar} from "../redux/task/task-slice";
import {ISnackBar} from "../interfaces/ISnackBar";
import CreateWorkLogDialog from "../components/Dialogs/CreateWorklog";
import {getWorklogs} from "../redux/worklog/worklog-slice";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

type StateObj = {
    user: any;
    taskListResponse: any;
    projectResponse: any;
    addTaskResponse: any;
    addWorklogResponse: any;
    getWorklogsResponse: any;
    editWorklogResponse: any;
    updateTaskResponse: any;

};
type ReduxProps = ConnectedProps<typeof connector>;

const LandingPage: FC<ReduxProps> = (props) => {
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [worklogs, setWorklogs] = useState<any[]>([]);
    const [taskList, setTaskList] = useState<any[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>({
        user: null,
        projectResponse: null,
        taskListResponse: null,
        projectListResponse: null,
        addTaskResponse: null,
        addWorklogResponse: null,
        getWorklogsResponse: null,
        editWorklogResponse: null,
        updateTaskResponse: null
    });
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    useEffect(() => {
        initials()
    }, []);

    const initials = () => {

    }

    //user
    useEffect(() => {
        if (
            (stateObj.user === null && appDataContext.user !== null) ||
            stateObj.user !== appDataContext.user
        ) {
            setStateObj({...stateObj, user: appDataContext.user});
        }
    }, [appDataContext.user])


    //selected project
    useEffect(() => {
        if (
            (stateObj.projectResponse === null && props.projectResponse !== null) ||
            stateObj.projectResponse !== props.projectResponse
        ) {
            setStateObj({...stateObj, projectResponse: props.projectResponse});
            if (props?.projectResponse?.responseCode === "GET_PROJECT_SUCCESS") {
                setWorklogs([]);
            }

        }
    }, [props.projectResponse])

    //selected project
    useEffect(() => {
        if (
            (stateObj.updateTaskResponse === null && props.updateTaskResponse !== null) ||
            stateObj.updateTaskResponse !== props.updateTaskResponse
        ) {
            setStateObj({...stateObj, updateTaskResponse: props.updateTaskResponse});

            if (props?.updateTaskResponse?.responseCode === "TASK_UPDATED") {
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                    dialogTitle: "",
                    dialogContent: null
                });
            }

        }
    }, [props.updateTaskResponse])


//projects
    useEffect(() => {
        if (
            (stateObj.projectListResponse === null && props.projectListResponse !== null) ||
            stateObj.projectListResponse !== props.projectListResponse
        ) {
            setStateObj({...stateObj, projectListResponse: props.projectListResponse});

        }
    }, [props.projectListResponse])


    useEffect(() => {
        if (
            (stateObj.taskListResponse === null && props.taskListResponse !== null) ||
            stateObj.taskListResponse !== props.taskListResponse
        ) {
            setStateObj({...stateObj, taskListResponse: props.taskListResponse});
            props.onSetLoader(false);
            if (props.taskListResponse?.responseCode === "GET_TASK_LIST_SUCCESS") {
                setTaskList(props.taskListResponse?.data);
            }
        }
    }, [props.taskListResponse])



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


    const editWorklog = (worklog: any) => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogTitle: "Edit Worklog",
            dialogContent: <CreateWorkLogDialog worklog={worklog} isEdit={true}/>
        });
    }


    useEffect(() => {
        if (
            (stateObj.addWorklogResponse === null && props.addWorklogResponse !== null) ||
            stateObj.addWorklogResponse !== props.addWorklogResponse
        ) {
            setStateObj({...stateObj, addWorklogResponse: props.addWorklogResponse});
            if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_SUCCESS") {
                const snackProps: ISnackBar = {
                    title: "Worklog Adding Success",
                    isOpen: true,
                    color: "success",
                    variant: "solid"
                }

                props.onShowSnackBar(snackProps);
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                    dialogTitle: "",
                    dialogContent: null
                });
            }
            if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_FAILED") {
                const snackProps: ISnackBar = {
                    title: "workLog Adding Failed",
                    message: props.addWorkLogResponse.error,
                    isOpen: true,
                    color: "danger",
                    variant: "outlined"
                }
                props.onShowSnackBar(snackProps);
            }

        }

    }, [props.addWorklogResponse]);


    useEffect(() => {
        if (
            (stateObj.editWorklogResponse === null && props.editWorklogResponse !== null) ||
            stateObj.editWorklogResponse !== props.editWorklogResponse
        ) {
            setStateObj({...stateObj, addWorklogResponse: props.editWorklogResponse});
            if (props.editWorklogResponse?.responseCode === "WORKLOG_EDIT_SUCCESS") {
                props.onGetWorklogs(appDataContext?.project?.id, appDataContext?.task?.id)
                const snackProps: ISnackBar = {
                    title: "Worklog Adding Success",
                    isOpen: true,
                    color: "success",
                    variant: "solid"
                }
                props.onShowSnackBar(snackProps);
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                    dialogTitle: "",
                    dialogContent: null
                });
            }
            if (props.editWorklogResponse?.responseCode === "WORKLOG_EDIT_FAILED") {
                const snackProps: ISnackBar = {
                    title: "workLog Adding Failed",
                    message: props.editWorklogResponse.error,
                    isOpen: true,
                    color: "danger",
                    variant: "outlined"
                }
                props.onShowSnackBar(snackProps);
            }

        }

    }, [props.editWorklogResponse]);

    useEffect(() => {
        if (
            (stateObj.addWorklogResponse === null && props.addWorklogResponse !== null) ||
            stateObj.addWorklogResponse !== props.addWorklogResponse
        ) {
            setStateObj({...stateObj, addWorklogResponse: props.addWorklogResponse});
            if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_SUCCESS") {
                const snackProps: ISnackBar = {
                    title: "Worklog Adding Success",
                    isOpen: true,
                    color: "success",
                    variant: "solid"
                }
                props.onGetWorklogs(appDataContext?.project?.id, appDataContext?.task?.id)
                props.onShowSnackBar(snackProps);
                setAppDataContext({
                    ...appDataContext,
                    isOpenDialog: false,
                    dialogTitle: "",
                    dialogContent: null
                });
            }
            if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_FAILED") {
                const snackProps: ISnackBar = {
                    title: "workLog Adding Failed",
                    message: props.addWorkLogResponse.error,
                    isOpen: true,
                    color: "danger",
                    variant: "outlined"
                }
                props.onShowSnackBar(snackProps);
            }

        }


    }, [props.addWorklogResponse]);

    useEffect(() => {
        if (
            (stateObj.getWorklogsResponse === null && props.getWorklogsResponse !== null) ||
            stateObj.getWorklogsResponse !== props.getWorklogsResponse
        ) {
            setStateObj({...stateObj, getWorklogsResponse: props.getWorklogsResponse});
            if (props.getWorklogsResponse?.responseCode === "GET_ALL_WORKLOG_SUCCESS") {
                setWorklogs(props.getWorklogsResponse?.data?.worklogs)
            } else if (props.getWorklogsResponse?.responseCode === "GET_ALL_WORKLOG_FAILED") {
                const snackProps: ISnackBar = {
                    title: "Worklog loding failed!!!",
                    message: props.getWorklogsResponse.error,
                    isOpen: true,
                    color: "danger",
                    variant: "outlined"
                }
                props.onShowSnackBar(snackProps);
            }

        }

    }, [props.getWorklogsResponse]);


    return (
        <>
            <Box>
                <TaskCreateBar/>
            </Box>
            <Box sx={{marginTop: 30}}>
                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 3

                }}>
                    <Sheet
                        variant="outlined"
                        sx={{
                            '--TableCell-height': '10px',
                            // the number is the amount of the header rows.
                            '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                            '--Table-firstColumnWidth': '80px',
                            '--Table-lastColumnWidth': '144px',
                            // background needs to have transparency to show the scrolling shadows
                            '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                            '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                            overflow: 'auto',
                            background: (
                                theme,
                            ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
                            backgroundSize:
                                '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                            backgroundRepeat: 'no-repeat',
                            backgroundAttachment: 'local, local, scroll, scroll',
                            backgroundPosition:
                                'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                            backgroundColor: 'background.surface',
                            overflowX: 'auto',
                            maxWidth: '100%',
                            height: "550px"
                        }}
                    >
                        <Box sx={{width: "100%"}}>
                            <Table
                                borderAxis="bothBetween"
                                stripe="odd"
                                hoverRow
                                sx={{
                                    width: "100%",
                                    '& tr > *:first-child': {
                                        position: 'sticky',
                                        left: 0,
                                        boxShadow: '1px 0 var(--TableCell-borderColor)',
                                        bgcolor: 'background.surface',
                                    },
                                    '& tr > *:last-child': {
                                        position: 'sticky',
                                        right: 0,
                                        bgcolor: 'var(--TableCell-headBackground)',
                                        width: '120px',
                                    },
                                }}
                            >
                                <thead>
                                <tr>
                                    <th style={{width: 150}}>Description</th>
                                    <th tyle={{width: 100}}>Start Time</th>
                                    <th tyle={{width: 100}}>End Time</th>
                                    <th tyle={{width: 100}}>Worklog Type</th>
                                    <th tyle={{width: 100}}>Owner</th>
                                    <th tyle={{width: 100}}>Created By</th>
                                    <th style={{width: 50}}/>
                                </tr>
                                </thead>
                                <tbody>
                                {worklogs?.map((row: any, index: number) => (
                                    <tr key={index}>
                                        <td>{row?.description ?? ""}</td>
                                        <td><Stack direction={"row"} spacing={1}>
                                            <Typography>{new Date(Number.parseInt(row?.start_time?.value)).toLocaleDateString()}</Typography><Chip
                                            label="primary" color="primary" variant="outlined"><Typography
                                            level={"body-sm"}>{new Date(Number.parseInt(row?.start_time?.value)).toLocaleTimeString()}</Typography></Chip>
                                        </Stack></td>
                                        <td><Stack direction={"row"} spacing={1}>
                                            <Typography>{new Date(Number.parseInt(row?.end_time?.value)).toLocaleDateString()}</Typography><Chip
                                            label="primary" color="primary" variant="outlined"><Typography
                                            level={"body-sm"}>{new Date(Number.parseInt(row?.start_time?.value)).toLocaleTimeString()}</Typography></Chip>
                                        </Stack></td>
                                        <td>{row?.worklog_type?.name ?? ""}</td>
                                        <td>{row?.owner?.email_id ?? ""}</td>
                                        <td>{row?.created_by?.email_id ?? ""}</td>
                                        <td>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => editWorklog(row)}
                                                    variant="soft"
                                                ><BorderColorRoundedIcon/></IconButton>
                                            </Box>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Box>
                    </Sheet>
                </Box>
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
        addTaskResponse: state.task.addTaskResponse,
        addWorklogResponse: state.worklog.addWorklogResponse,
        getWorklogsResponse: state.worklog.getWorklogsResponse,
        editWorklogResponse: state.worklog.editWorklogResponse,
        projectResponse: state.task.projectResponse,
        updateTaskResponse: state.task.updateTaskResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props)),
        onSetLoader: (payload: boolean) => dispatch(setLoader(payload)),
        onGetWorklogs: (projectId: string, taskId: string) => dispatch(getWorklogs({
            projectId: projectId,
            taskId: taskId
        })),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
