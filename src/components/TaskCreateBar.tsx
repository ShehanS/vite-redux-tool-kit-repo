import {FC, useEffect, useState} from "react";
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import {Box, Button, CircularProgress, Grid, Option, Select, Stack, Typography} from "@mui/joy";
import {RootState} from "../redux/store";
import {getProject, getProjectById, getTask} from "../redux/task/task-slice";
import {connect, ConnectedProps} from "react-redux";
import {useAppDataContext} from "../context/AppDataContext";
import CreateTaskDialog from "./Dialogs/CreateTaskDialog";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {IGeneralRequest} from "../interfaces/IGeneralRequest";

type ReduxProps = ConnectedProps<typeof connector>;


type StateObj = {
    projectListResponse: any;
    user: any;
    taskListResponse: any;
    selectedProjectResponse: any;

};


const TaskCreateBar: FC<ReduxProps> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>({
        projectListResponse: null,
        user: null,
        taskListResponse: null,
        selectedProjectResponse: null
    });
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
            (stateObj.projectListResponse === null && props.projectListResponse !== null) ||
            stateObj.projectListResponse !== props.projectListResponse
        ) {
            setIsLoading(false);
            setStateObj({...stateObj, projectListResponse: props.projectListResponse});
            if (props.projectListResponse?.responseCode === "GET_PROJECT_SUCCESS") {
                setProjects(props.projectListResponse?.data)
            }
        }

    }, [props.projectListResponse])


    const selectProjectDropdown = () => {
        setIsLoading(true);
        const request = {
            email: stateObj?.user?.email
        }
        props.onGetProjects(request);
    }
    const selectProject = (event: any, value: any) => {
        if (value !== null) {
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
            setSelectedTask(value);
        }
    }

    const handleTaskCreate = (task: any) => {
    }

    const openTaskCreateDialog = () => {
        setAppDataContext({
            ...appDataContext,
            isOpenDialog: true,
            dialogTitle: "Add Task",
            dialogContent: <CreateTaskDialog user={stateObj.user} project={selectedProject}
                                             onCreate={handleTaskCreate}/>
        });
    }

    return (
        <>
            <Box sx={{
                width: '98%',
                position: 'fixed',
                display: 'flex',
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
                                    <Select defaultValue={selectedProject} value={selectedProject}
                                            onChange={selectProject}
                                            onClick={selectProjectDropdown}
                                            placeholder="Project..."
                                            startDecorator={isLoading && <CircularProgress size="sm"/>}
                                            sx={{width: 270}}
                                    >
                                        {projects?.map((project: any) => (
                                            <Option value={project}>{project?.title}</Option>
                                        ))}
                                    </Select>

                                    <Typography level="body-sm" fontSize={"md"}>
                                        Ongoing Task
                                    </Typography>
                                    <Select defaultValue={selectedTask} value={selectedTask} onChange={selectTask}
                                            placeholder="Task..."
                                        // startDecorator={<AssignmentTurnedInRoundedIcon/>}
                                            sx={{width: 270}}
                                    >
                                        {tasks?.map((task: any) => (
                                            <Option value={task}>{task?.title}</Option>
                                        ))}
                                    </Select>

                                    <Button
                                        color="neutral"
                                        onClick={openTaskCreateDialog}
                                        variant="soft"
                                    >Create Task</Button></Stack>
                            </Grid>
                            <Grid lg={6} md={12} sm={12}>
                                <Stack direction={"row"}
                                       sx={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>

                                    <Stack direction={"row"} spacing={1}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker sx={{width: 120}} slotProps={{textField: {size: 'small'}}}
                                                        ampm={false}/>
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker sx={{width: 120}} slotProps={{textField: {size: 'small'}}}
                                                        ampm={false}/>
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker sx={{width: 250}} slotProps={{textField: {size: 'small'}}}/>
                                        </LocalizationProvider>
                                        <Button
                                            color="primary"
                                            onClick={openTaskCreateDialog}
                                            variant="soft"
                                        >Update</Button>
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
        projectResponse: state.task.projectResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetProjects: (payload: IGeneralRequest) => dispatch(getProject(payload)),
        onGetTasks: (payload: IGeneralRequest) => dispatch(getTask(payload)),
        onGetProjectById: (payload: IGeneralRequest) => dispatch(getProjectById(payload)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(TaskCreateBar);
