import { FC, useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { RootState } from "../redux/store";
import {
  clearTaskResponseHistory,
  deleteTaskById,
  getProject,
  getProjectById,
  getTask,
  getTaskById,
  setLoader,
  setResetState,
  setSnackBar,
  updateTask,
  setTodayFilter,
} from "../redux/task/task-slice";
import { connect, ConnectedProps } from "react-redux";
import { useAppDataContext } from "../context/AppDataContext";
import CreateTaskDialog from "./Dialogs/CreateTaskDialog";
import { IGeneralRequest } from "../interfaces/IGeneralRequest";
import { ITaskAttribute } from "../interfaces/ITask";
import { ISnackBar } from "../interfaces/ISnackBar";
import DeleteDialog from "./Dialogs/DeleteDialog";
import CreateWorkLogDialog from "./Dialogs/CreateWorklog";
import { getWorklogs } from "../redux/worklog/worklog-slice";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PatternRoundedIcon from "@mui/icons-material/PatternRounded";
// import TodayNDatePicker from "./TodayNDatePicker";

type ReduxProps = ConnectedProps<typeof connector>;

type StateObj = {
  user: any;
  projectListResponse: any;
  taskListResponse: any;
  selectedProjectResponse: any;
  getTaskResponse: any;
  updateTaskResponse: any;
  addTaskResponse: any;
  deleteTaskResponse: any;
  isTodayFilterActive: boolean;
};

const MainBar: FC<ReduxProps> = (props) => {
  const { appDataContext, setAppDataContext } = useAppDataContext();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentSelectedTask, setCurrentSelectedTask] =
    useState<ITaskAttribute>(null);
  // const [selectedTask, setSelectedTask] = useState<ITask>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTaskLoading, setTaskIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskActualStartTime, setTaskActualStartTime] = useState<
    Date | undefined
  >(new Date());
  const [taskActualEndTime, setTaskActualEndTime] = useState<Date | undefined>(
    new Date()
  );

  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [isTodayFilterActive, setIsTodayFilterActive] =
    useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [stateObj, setStateObj] = useState<StateObj>({
    projectListResponse: null,
    user: null,
    taskListResponse: null,
    selectedProjectResponse: null,
    getTaskResponse: null,
    updateTaskResponse: null,
    addTaskResponse: null,
    deleteTaskResponse: null,
    isTodayFilterActive: null,
  });

  // useEffect(() => {
  //     setInterval(() => {
  //         setIsLoading(false);
  //     }, 3000)
  // }, [isTaskLoading]);

  useEffect(() => {
    if (
      (stateObj.user === null && appDataContext.user !== null) ||
      stateObj.user !== appDataContext.user
    ) {
      setStateObj({ ...stateObj, user: appDataContext.user });
    }
  }, [appDataContext.user]);

  useEffect(() => {
    if (
      (stateObj.taskListResponse === null && props.taskListResponse !== null) ||
      stateObj.taskListResponse !== props.taskListResponse
    ) {
      setTaskIsLoading(false);
      setStateObj({ ...stateObj, taskListResponse: props.taskListResponse });
      if (props.taskListResponse?.responseCode === "GET_TASK_LIST_SUCCESS") {
        setTasks(props.taskListResponse?.data);
      }
    }
  }, [props.taskListResponse]);

  useEffect(() => {
    if (
      (stateObj.getTaskResponse === null && props.getTaskResponse !== null) ||
      stateObj.getTaskResponse !== props.getTaskResponse
    ) {
      setTaskIsLoading(false);
      setStateObj({ ...stateObj, getTaskResponse: props.getTaskResponse });
      if (props.getTaskResponse?.responseCode === "GET_TASK_SUCCESS") {
        // setSelectedTask(props.getTaskResponse?.data);
        const snackProps: ISnackBar = {
          title: "Switching task success",
          isOpen: true,
          color: "success",
          variant: "solid",
        };
        props.onShowSnackBar(snackProps);
      } else if (props.getTaskResponse?.responseCode === "GET_TASK_FAILED") {
        const snackProps: ISnackBar = {
          title: "Switching task failed",
          isOpen: true,
          color: "success",
          variant: "solid",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.getTaskResponse]);

  useEffect(() => {
    if (
      (stateObj.updateTaskResponse === null &&
        props.updateTaskResponse !== null) ||
      stateObj.updateTaskResponse !== props.updateTaskResponse
    ) {
      setStateObj({
        ...stateObj,
        updateTaskResponse: props.updateTaskResponse,
      });
      if (props.updateTaskResponse?.responseCode === "TASK_UPDATED") {
        if (props?.updateTaskResponse?.data?.task?.status?.name === "Closed") {
          setCurrentSelectedTask(null);
          // setAppDataContext({
          //     ...appDataContext,
          //     isOpenDialog: false,
          //     dialogTitle: "",
          //     dialogContent: null
          // });
          //setAppDataContext({...appDataContext, task: null});
        }
        const snackProps: ISnackBar = {
          title: "Task update success",
          isOpen: true,
          color: "success",
          variant: "solid",
        };
        props.onShowSnackBar(snackProps);
      } else if (
        props.updateTaskResponse?.responseCode === "TASK_UPDATE_FAILED"
      ) {
        const snackProps: ISnackBar = {
          title: "Task update failed",
          message: props.updateTaskResponse.error,
          isOpen: true,
          color: "success",
          variant: "solid",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.updateTaskResponse]);

  useEffect(() => {
    if (
      (stateObj.addTaskResponse === null && props.addTaskResponse !== null) ||
      stateObj.addTaskResponse !== props.addTaskResponse
    ) {
      setStateObj({ ...stateObj, addTaskResponse: props.addTaskResponse });
      if (props.addTaskResponse?.responseCode === "TASK_ADD_SUCCESS") {
        setTaskIsLoading(true);
        const request = {
          projectId: selectedProject?.id,
        };
        props.onGetTasks(request);
      }
    }
  }, [props.addTaskResponse]);

  useEffect(() => {
    const startEpoch = Number.parseInt(
      stateObj.getTaskResponse?.data?.task?.actual_start_time?.value
    );
    const endEpoch = Number.parseInt(
      stateObj.getTaskResponse?.data?.task?.actual_end_time?.value
    );
    setTaskActualStartTime(new Date(startEpoch));
    setTaskActualEndTime(new Date(endEpoch));
    setCurrentDate(endEpoch);
  }, [stateObj.getTaskResponse]);

  useEffect(() => {
    if (
      (stateObj.projectListResponse === null &&
        props.projectListResponse !== null) ||
      stateObj.projectListResponse !== props.projectListResponse
    ) {
      setIsLoading(false);
      setStateObj({
        ...stateObj,
        projectListResponse: props.projectListResponse,
      });
      if (props.projectListResponse?.responseCode === "GET_PROJECT_SUCCESS") {
        if (projects.length !== props.projectListResponse?.data?.length) {
          setProjects(props.projectListResponse?.data);
        }
      }
    }
  }, [props.projectListResponse]);

  const selectProjectDropdown = () => {
    if (appDataContext.user.email !== null) {
      setIsLoading(true);
      setTaskIsLoading(false);
      const request = {
        email: "shehan.salinda@ncinga.net",
      };
      props.onGetProjects(request);
    }
  };
  const selectProject = (event: any, value: any) => {
    if (value !== null) {
      props.onSetLoader(true);
      setSelectedProject(value);
      setTasks(null);
      setCurrentSelectedTask(null);
      const request = {
        projectId: value?.id,
      };
      setAppDataContext({ ...appDataContext, project: value });
      props.onGetTasks(request);
      props.onGetProjectById(request);
    }
  };

  const selectTask = (event: any, value: any) => {
    if (value !== null) {
      setCurrentSelectedTask(value);
      props.onGetTask(selectedProject.id, value.id);
      props.onGetWorklogs(selectedProject.id, value.id);
      setAppDataContext({ ...appDataContext, task: value });
    }
  };

  const openTaskCreateDialog = () => {
    props.onReset();
    props.onClearTaskResponse();
    setAppDataContext({
      ...appDataContext,
      isOpenDialog: true,
      dialogTitle: "Add Task",
      dialogContent: (
        <CreateTaskDialog
          isEdit={false}
          user={appDataContext.user}
          project={selectedProject}
          selectedTask={null}
        />
      ),
    });
  };

  const openWorklogCreateDialog = () => {
    props.onReset();
    setAppDataContext({
      ...appDataContext,
      isOpenDialog: true,
      dialogTitle: "Add Worklog",
      dialogContent: (
        <CreateWorkLogDialog
          isEdit={false}
          user={appDataContext.user}
          project={selectedProject}
          task={currentSelectedTask}
        />
      ),
    });
  };

  const editTaskCreateDialog = () => {
    props.onReset();
    setAppDataContext({
      ...appDataContext,
      isOpenDialog: true,
      dialogTitle: "Edit Task",
      dialogContent: (
        <CreateTaskDialog
          isEdit={true}
          user={appDataContext.user}
          project={selectedProject}
          selectedTask={currentSelectedTask}
        />
      ),
    });
  };

  // const updateTask = () => {
  //     let taskObject: ITask = {
  //         task: selectedTask.task
  //     }
  //     const updatedTaskObject = {
  //
  //         ...taskObject,
  //         task: {
  //             ...taskObject.task,
  //             actual_end_time: {
  //                 ...taskObject.task.actual_end_time,
  //                 value: taskActualEndTime?.getTime().toString() ?? "",
  //             },
  //             actual_start_time: {
  //                 ...taskObject.task.actual_start_time,
  //                 value: taskActualEndTime?.getTime().toString() ?? ""
  //             },
  //             scheduled_start_time: {
  //                 ...taskObject.task.scheduled_start_time,
  //                 value: taskActualEndTime?.getTime().toString() ?? ""
  //             },
  //             scheduled_end_time: {
  //                 ...taskObject.task.scheduled_end_time,
  //                 value: taskActualEndTime?.getTime().toString() ?? ""
  //             }
  //         },
  //     };
  //
  //     props.onUpdateTask(updatedTaskObject, selectedProject.id, currentSelectedTask.id);
  // }

  const openDeleteTaskConfirm = () => {
    setAppDataContext({
      ...appDataContext,
      isOpenDialog: true,
      dialogTitle: "Confirmation",
      dialogContent: (
        <DeleteDialog
          onDelete={handleDeleteTask}
          id={currentSelectedTask.id}
          title={currentSelectedTask.title}
        />
      ),
    });
  };

  const handleDeleteTask = (taskid: string) => {
    props.onDelete(selectedProject.id, taskid);
    const request = {
      projectId: appDataContext.project.id,
    };
    props.onGetTasks(request);
  };

  useEffect(() => {
    if (
      (stateObj.deleteTaskResponse === null &&
        props.deleteTaskResponse !== null) ||
      stateObj.deleteTaskResponse !== props.deleteTaskResponse
    ) {
      setStateObj({
        ...stateObj,
        deleteTaskResponse: props.deleteTaskResponse,
      });
      if (props.deleteTaskResponse?.responseCode === "DELETE_TASK_SUCCESS") {
        setCurrentSelectedTask(null);
      }
    }
  }, [props.deleteTaskResponse]);

  const getTasks = () => {
    setTaskIsLoading(true);
    const request = {
      projectId: selectedProject?.id,
      email: "shehan.salinda@ncinga.net",
    };
    props.onGetTasks(request);
  };

  const handleTodayButtonClick = () => {
    props.setTodayFilter();
  };

  useEffect(() => {}, [props.isTodayFilterActive]);

  return (
    <>
      <Box
        sx={{
          top: 150,
          width: "98%",
          position: "fixed",
          display: "flex",
          zIndex: 50,
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          orientation="horizontal"
          sx={{
            width: "100%",
          }}
        >
          <CardContent>
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "40%",
              }}
              spacing={1}
            >
              <Stack
                spacing={1}
                direction={"row"}
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography level="body-sm" fontSize={"md"}>
                  Project
                </Typography>
                <Select
                  value={selectedProject ?? ""}
                  onChange={selectProject}
                  onClick={selectProjectDropdown}
                  placeholder="Project..."
                  startDecorator={isLoading && <CircularProgress size="sm" />}
                  sx={{ width: 270 }}
                >
                  {projects?.map((project: any, index: number) => (
                    <Option
                      disabled={isLoading ? true : false}
                      key={index}
                      value={project}
                    >
                      {project?.title}
                    </Option>
                  ))}
                </Select>
              </Stack>
              <Stack
                spacing={1}
                direction={"row"}
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography level="body-sm" fontSize={"md"}>
                  Task
                </Typography>
                <Select
                  disabled={selectedProject !== null ? false : true}
                  value={currentSelectedTask ?? ""}
                  onChange={(event, value) => selectTask(event, value)}
                  onClick={() => getTasks()}
                  placeholder="Task..."
                  sx={{ width: 270 }}
                  startDecorator={
                    isTaskLoading && <CircularProgress size="sm" />
                  }
                >
                  {tasks?.map((task: any, index: number) => (
                    <Option
                      disabled={isTaskLoading ? true : false}
                      key={index}
                      value={task}
                    >
                      {task?.title}
                    </Option>
                  ))}
                </Select>
                <IconButton
                  disabled={selectedProject !== null ? false : true}
                  color="primary"
                  sx={{ background: "#0ca59d" }}
                  onClick={openTaskCreateDialog}
                  variant="solid"
                >
                  <AddCircleRoundedIcon />
                </IconButton>
                <IconButton
                  disabled={currentSelectedTask !== null ? false : true}
                  color="primary"
                  sx={{ background: "#fc8441" }}
                  onClick={editTaskCreateDialog}
                  variant="solid"
                >
                  <BorderColorRoundedIcon />
                </IconButton>
                <IconButton
                  disabled={currentSelectedTask !== null ? false : true}
                  color="primary"
                  sx={{ background: "#e85153" }}
                  onClick={openDeleteTaskConfirm}
                  variant="solid"
                >
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </Stack>
              <Button
                variant={"outlined"}
                disabled={currentSelectedTask === null ? true : false}
                onClick={openWorklogCreateDialog}
              >
                <PatternRoundedIcon />
                Worklog
              </Button>
              <Button onClick={handleTodayButtonClick}>Today</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    projectListResponse: state.task.projectListResponse,
    taskListResponse: state.task.taskListResponse,
    projectResponse: state.task.projectResponse,
    getTaskResponse: state.task.getTaskResponse,
    updateTaskResponse: state.task.updateTaskResponse,
    addTaskResponse: state.task.addTaskResponse,
    deleteTaskResponse: state.task.deleteTaskResponse,
    isTodayFilterActive: state.task.isTodayFilterActive,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDelete: (projectId: string, taskId: string) =>
      dispatch(
        deleteTaskById({
          projectId: projectId,
          taskId: taskId,
        })
      ),
    onClearTaskResponse: () => dispatch(clearTaskResponseHistory()),
    onGetProjects: (payload: IGeneralRequest) => dispatch(getProject(payload)),
    onGetTasks: (payload: IGeneralRequest) => dispatch(getTask(payload)),
    onGetProjectById: (payload: IGeneralRequest) =>
      dispatch(getProjectById(payload)),
    onSetLoader: (payload: boolean) => dispatch(setLoader(payload)),
    onReset: () => dispatch(setResetState()),
    onGetWorklogs: (projectId: string, taskId: string) =>
      dispatch(
        getWorklogs({
          projectId: projectId,
          taskId: taskId,
        })
      ),
    onUpdateTask: (payload: any, projectId: string, taskId: string) =>
      dispatch(
        updateTask({
          payload: payload,
          projectId: projectId,
          taskId: taskId,
        })
      ),
    onGetTask: (projectId: string, taskId: string) =>
      dispatch(
        getTaskById({
          projectId: projectId,
          taskId: taskId,
        })
      ),

    onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props)),
    setTodayFilter: () => dispatch(setTodayFilter()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(MainBar);
