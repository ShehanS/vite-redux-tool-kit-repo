import {FC, useEffect, useState} from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import {Box, Button, CircularProgress, Grid, Option, Select, Stack, Typography} from "@mui/joy";
import {RootState} from "../redux/store";
import {
    getProject,
    getProjectById,
    getTask,
    getTaskById,
    setLoader,
    setResetState,
    setSnackBar,
    updateTask
} from "../redux/task/task-slice";
import {connect, ConnectedProps} from "react-redux";
import {useAppDataContext} from "../context/AppDataContext";
import CreateTaskDialog from "./Dialogs/CreateTaskDialog";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {IGeneralRequest} from "../interfaces/IGeneralRequest";
import {ITask, ITaskAttribute} from "../interfaces/ITask";
import {ISnackBar} from "../interfaces/ISnackBar";
import DeleteDialog from "./Dialogs/DeleteDialog";

type ReduxProps = ConnectedProps<typeof connector>;


type StateObj = {
    user: any;
    projectListResponse: any;
    taskListResponse: any;
    selectedProjectResponse: any;
    getTaskResponse: any;
    updateTaskResponse: any;
    addTaskResponse: any;

};


const TaskCreateBar: FC<ReduxProps> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [currentSelectedTask, setCurrentSelectedTask] = useState<ITaskAttribute>(null);
    const [selectedTask, setSelectedTask] = useState<ITask>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTaskLoading, setTaskIsLoading] = useState<boolean>(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [actualStartTime, setActualStartTime] = useState<number>(new Date().getTime());
    const [actualEndTime, setActuaEndTime] = useState<number>(new Date().getTime());
    const [currentDate, setCurrentDate] = useState<any>(new Date());
    const [stateObj, setStateObj] = useState<StateObj>({
        projectListResponse: null,
        user: null,
        taskListResponse: null,
        selectedProjectResponse: null,
        getTaskResponse: null,
        updateTaskResponse: null,
        addTaskResponse: null
    });


    useEffect(() => {
        setInterval(() => {
            setIsLoading(false);
        }, 3000)
    }, [isTaskLoading]);

    useEffect(() => {
        if (
            (stateObj.user === null && appDataContext.user !== null) ||
            stateObj.user !== appDataContext.user
        ) {
            setStateObj({...stateObj, user: appDataContext.user});
        }
    }, [appDataContext.user])

    useEffect(() => {
        if (
            (stateObj.taskListResponse === null && props.taskListResponse !== null) ||
            stateObj.taskListResponse !== props.taskListResponse
        ) {
            setStateObj({...stateObj, taskListResponse: props.taskListResponse});
            if (props.taskListResponse?.responseCode === "GET_TASK_LIST_SUCCESS") {
                setTasks(props.taskListResponse?.data)
            }
        }
    }, [props.taskListResponse])

    useEffect(() => {
        if (
            (stateObj.getTaskResponse === null && props.getTaskResponse !== null) ||
            stateObj.getTaskResponse !== props.getTaskResponse
        ) {
            setTaskIsLoading(false);
            setStateObj({...stateObj, getTaskResponse: props.getTaskResponse});
            if (props.getTaskResponse?.responseCode === "GET_TASK_SUCCESS") {
                setSelectedTask(props.getTaskResponse?.data);
                const snackProps: ISnackBar = {
                    title: "Switching task success",
                    isOpen: true,
                    color: "success",
                    variant: "solid"
                }
                props.onShowSnackBar(snackProps);
            } else if (props.getTaskResponse?.responseCode === "GET_TASK_FAILED") {
                const snackProps: ISnackBar = {
                    title: "Switching task failed",
                    isOpen: true,
                    color: "success",
                    variant: "solid"
                }
                props.onShowSnackBar(snackProps);
            }
        }
    }, [props.getTaskResponse])

    useEffect(() => {
        if (
            (stateObj.updateTaskResponse === null && props.updateTaskResponse !== null) ||
            stateObj.updateTaskResponse !== props.updateTaskResponse
        ) {
            setStateObj({...stateObj, updateTaskResponse: props.updateTaskResponse});
            if (props.updateTaskResponse?.responseCode === "TASK_UPDATED") {
                const snackProps: ISnackBar = {
                    title: "Task update success",
                    isOpen: true,
                    color: "success",
                    variant: "solid"
                }
                props.onShowSnackBar(snackProps);
            } else if (props.updateTaskResponse?.responseCode === "TASK_UPDATE_FAILED") {
                const snackProps: ISnackBar = {
                    title: "Task update failed",
                    isOpen: true,
                    color: "success",
                    variant: "solid"
                }
                props.onShowSnackBar(snackProps);
            }

        }
    }, [props.updateTaskResponse])

    useEffect(() => {
        if (
            (stateObj.addTaskResponse === null && props.addTaskResponse !== null) ||
            stateObj.addTaskResponse !== props.addTaskResponse
        ) {
            setStateObj({...stateObj, addTaskResponse: props.addTaskResponse});
            if (props.addTaskResponse?.responseCode === "TASK_ADD_SUCCESS") {
                setTaskIsLoading(true);
                const request = {
                    projectId: selectedProject?.id
                }
                props.onGetTasks(request);
            }


        }

    }, [props.addTaskResponse]);


    useEffect(() => {
        const startEpoch = Number.parseInt(stateObj.getTaskResponse?.data?.task?.actual_start_time?.value);
        const endEpoch = Number.parseInt(stateObj.getTaskResponse?.data?.task?.actual_end_time?.value);
        setActualStartTime(startEpoch);
        setActuaEndTime(endEpoch);
        setCurrentDate(endEpoch);
    }, [stateObj.getTaskResponse]);


    useEffect(() => {
        if (
            (stateObj.projectListResponse === null && props.projectListResponse !== null) ||
            stateObj.projectListResponse !== props.projectListResponse
        ) {
            setIsLoading(false);
            setStateObj({...stateObj, projectListResponse: props.projectListResponse});
            if (props.projectListResponse?.responseCode === "GET_PROJECT_SUCCESS") {
                if (projects.length !== props.projectListResponse?.data?.length) {
                    setProjects(props.projectListResponse?.data)
                }
            }
        }

    }, [props.projectListResponse])


    const selectProjectDropdown = () => {
        if (appDataContext.user.email !== null) {
            setIsLoading(true);
            const request = {
                email: appDataContext.user.email
            }
            props.onGetProjects(request);
        }
    }
    const selectProject = (event: any, value: any) => {
        if (value !== null) {
            props.onSetLoader(true);
            setSelectedProject(value);
            const request = {
                projectId: value?.id
            }
            props.onGetTasks(request);
            props.onGetProjectById(request);
        }
    }

    const selectTask = (event: any, value: any) => {
        if (value !== null) {
            setCurrentSelectedTask(value);
            props.onGetTask(selectedProject.id, value.id)
        }
    }

    const openTaskCreateDialog = () => {
        props.onReset();
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogTitle: "Add Task",
            dialogContent: <CreateTaskDialog isEdit={false} user={appDataContext.user} project={selectedProject}
                                             selectedTask={null}/>
        });
    }

    const editTaskCreateDialog = () => {
        props.onReset();
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogTitle: "Edit Task",
            dialogContent: <CreateTaskDialog isEdit={true} user={appDataContext.user} project={selectedProject}
                                             selectedTask={currentSelectedTask}/>
        });
    }

    const updateTask = () => {
        let taskObject: ITask = {
            task: selectedTask.task
        }
        const updatedTaskObject = {
            ...taskObject,
            task: {
                ...taskObject.task,
                actual_end_time: {
                    ...taskObject.task.actual_end_time,
                    value: actualEndTime.toString(),
                },
                actual_start_time: {
                    ...taskObject.task.actual_start_time,
                    value: actualStartTime.toString()
                },
                scheduled_start_time: {
                    ...taskObject.task.scheduled_start_time,
                    value: actualStartTime.toString()
                },
                scheduled_end_time: {
                    ...taskObject.task.scheduled_end_time,
                    value: actualEndTime.toString()
                }
            },
        };
        props.onUpdateTask(updatedTaskObject, selectedProject.id, currentSelectedTask.id);
    }

    const deleteTask = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogContent: <DeleteDialog projectId={selectedProject.id} taskId={currentSelectedTask.id}
                                         taskTitle={selectedTask.task.title}/>
        })
    }

    const getTasks = () => {
        setTaskIsLoading(true);
        const request = {
            projectId: selectedProject?.id
        }
        props.onGetTasks(request);

    }

    return (
        <>
            <Box sx={{
                width: '98%',
                position: 'fixed',
                display: 'flex',
                zIndex: 50,
                justifyContent: 'center'
            }}>
                <Card
                    variant="outlined"
                    orientation="horizontal"
                    sx={{
                        width: '95%',
                        '&:hover': {boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder'},
                    }}
                >


                    <CardContent>
                        <Grid container spacing={2} sx={{flexGrow: 1}}>
                            <Grid lg={6} md={12} sm={12}>
                                <Stack direction={"row"}
                                       sx={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                    <Typography level="body-sm" fontSize={"md"}>
                                        Select Project
                                    </Typography>
                                    <Select value={selectedProject}
                                            onChange={selectProject}
                                            onClick={selectProjectDropdown}
                                            placeholder="Project..."
                                            startDecorator={isLoading && <CircularProgress size="sm"/>}
                                            sx={{width: 270}}
                                    >
                                        {projects?.map((project: any, index: number) => (
                                            <Option key={index} value={project}>{project?.title}</Option>
                                        ))}
                                    </Select>

                                    <Typography level="body-sm" fontSize={"md"}>
                                        Ongoing Task
                                    </Typography>
                                    <Select onClick={getTasks} defaultValue={currentSelectedTask}
                                            value={currentSelectedTask}
                                            onChange={selectTask}
                                            placeholder="Task..."
                                            sx={{width: 270}}
                                            startDecorator={isTaskLoading && <CircularProgress size="sm"/>}
                                    >
                                        {tasks?.map((task: any, index: number) => (
                                            <Option key={index} value={task}>{task?.title}</Option>
                                        ))}
                                    </Select>

                                    <Button
                                        color="success"
                                        onClick={openTaskCreateDialog}
                                        variant="soft"
                                    >Create</Button> <Button
                                    color="primary"
                                    onClick={editTaskCreateDialog}
                                    variant="soft"
                                >Edit</Button></Stack>
                            </Grid>
                            <Grid lg={6} md={12} sm={12}>
                                <Stack direction={"row"}
                                       sx={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>

                                    <Stack direction={"row"} spacing={1}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker value={actualStartTime}
                                                        onChange={(event: Date) => setActualStartTime(event.getTime())}
                                                        sx={{width: 120}} slotProps={{textField: {size: 'small'}}}
                                                        ampm={false}/>
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker value={actualEndTime}
                                                        onChange={(event: Date) => setActuaEndTime(event.getTime())}
                                                        sx={{width: 120}} slotProps={{textField: {size: 'small'}}}
                                                        ampm={false}/>
                                        </LocalizationProvider>
                                        {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                                        {/*    <DatePicker value={currentDate} onChange={(event) => setCurrentDate(event)}*/}
                                        {/*                sx={{width: 250}} slotProps={{textField: {size: 'small'}}}/>*/}
                                        {/*</LocalizationProvider>*/}
                                        <Button
                                            color="primary"
                                            onClick={updateTask}
                                            variant="soft"
                                        >Update</Button>
                                        <Button
                                            color="danger"
                                            onClick={deleteTask}
                                            variant="soft"
                                        >Delete</Button>

                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        projectListResponse: state.task.projectListResponse,
        taskListResponse: state.task.taskListResponse,
        projectResponse: state.task.projectResponse,
        getTaskResponse: state.task.getTaskResponse,
        updateTaskResponse: state.task.updateTaskResponse,
        addTaskResponse: state.task.addTaskResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetProjects: (payload: IGeneralRequest) => dispatch(getProject(payload)),
        onGetTasks: (payload: IGeneralRequest) => dispatch(getTask(payload)),
        onGetProjectById: (payload: IGeneralRequest) => dispatch(getProjectById(payload)),
        onSetLoader: (payload: boolean) => dispatch(setLoader(payload)),
        onReset: () => dispatch(setResetState()),
        onUpdateTask: (payload: any, projectId: string, taskId: string) => dispatch(updateTask({
            payload: payload,
            projectId: projectId,
            taskId: taskId
        })),
        onGetTask: (projectId: string, taskId: string) => dispatch(getTaskById({
            projectId: projectId,
            taskId: taskId
        })),
        onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(TaskCreateBar);
