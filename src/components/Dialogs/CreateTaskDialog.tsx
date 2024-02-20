import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RootState } from "../../redux/store";
import { connect, ConnectedProps } from "react-redux";
import {
  addTask,
  getOwnersByProjectById,
  getPriorityByProjectById,
  getStatusByProjectById,
  getTaskById,
  setSnackBar,
  updateTask,
} from "../../redux/task/task-slice";
import { IGeneralRequest } from "../../interfaces/IGeneralRequest";
import { IPriority, IStatus, ITask } from "../../interfaces/ITask";
import { ISnackBar } from "../../interfaces/ISnackBar";
import { useAppDataContext } from "../../context/AppDataContext";

type OwnProps = {
  isEdit?: boolean;
  project?: any;
  onCreate?: (task: any) => void;
  user?: any;
  selectedTask?: any;
};
type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

type StateObj = {
  getWorklogsResponse: any;
  ownerResponse: any;
  priorityResponse: any;
  statusResponse: any;
  addTaskResponse: any;
  selectedTask: any;
  getTaskResponse: any;
};
type InputObjectState = {
  input: any;
};

const CreateTaskDialog: FC<Props> = (props) => {
  const { appDataContext, setAppDataContext } = useAppDataContext();
  const [taskActualStartTime, setTaskActualStartTime] = useState<
    Date | undefined
  >(new Date());
  const [taskActualEndTime, setTaskActualEndTime] = useState<Date | undefined>(
    new Date()
  );
  const [error, setError] = useState({ message: "", isEnable: false });
  const [worklogs, setWorklogs] = useState<any[]>([]);
  const [inputObject, setInputObject] = useState<InputObjectState>({
    input: {},
  });
  const [owner, setOwner] = useState<any>(null);
  const [priorities, setPriorities] = useState<any[]>([]);
  const [status, setStatus] = useState<any[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [stateObj, setStateObj] = useState<StateObj>({
    getWorklogsResponse: null,
    ownerResponse: null,
    priorityResponse: null,
    statusResponse: null,
    addTaskResponse: null,
    selectedTask: null,
    getTaskResponse: null,
  });

  const loadTask = () => {
    if (props.isEdit) {
      props.onGetTask(props.project.id, props.selectedTask.id);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  useEffect(() => {
    if (
      (stateObj.ownerResponse === null && props.ownerResponse !== null) ||
      stateObj.ownerResponse !== props.ownerResponse
    ) {
      setStateObj({ ...stateObj, ownerResponse: props.ownerResponse });
      if (props.ownerResponse?.responseCode === "GET_TASK_OWNERS_SUCCESS") {
        const owner = props.ownerResponse?.data.filter(
          (owner: any) => owner?.email_id === props.user?.email
        )?.[0];
        setOwner(owner);
      }
    }
  }, [props.ownerResponse]);

  useEffect(() => {
    if (
      (stateObj.getWorklogsResponse === null &&
        props.getWorklogsResponse !== null) ||
      stateObj.getWorklogsResponse !== props.getWorklogsResponse
    ) {
      setStateObj({
        ...stateObj,
        getWorklogsResponse: props.getWorklogsResponse,
      });
      if (
        props.getWorklogsResponse?.responseCode === "GET_ALL_WORKLOG_SUCCESS"
      ) {
        const workLogs = props.getWorklogsResponse?.data?.worklogs;
        setWorklogs(workLogs);
      } else if (
        props.getWorklogsResponse?.responseCode === "GET_ALL_WORKLOG_FAILED"
      ) {
        const snackProps: ISnackBar = {
          title: "Worklog loding failed!!!",
          message: props.getWorklogsResponse.error,
          isOpen: true,
          color: "danger",
          variant: "outlined",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.getWorklogsResponse]);

  // useEffect(() => {
  //     if (
  //         (stateObj.selectedTask === null && props.selectedTask !== undefined || null) ||
  //         stateObj.selectedTask !== props.selectedTask
  //     ) {
  //         setStateObj({...stateObj, selectedTask: props.selectedTask});
  //         initData();
  //     }
  //
  // }, [props.selectedTask]);

  ////task
  useEffect(() => {
    if (
      (stateObj.getTaskResponse === null && props.getTaskResponse !== null) ||
      stateObj.getTaskResponse !== props.getTaskResponse
    ) {
      setStateObj({ ...stateObj, getTaskResponse: props.getTaskResponse });
      if (props.getTaskResponse?.responseCode === "GET_TASK_SUCCESS") {
        initData(props.getTaskResponse?.data?.task);
      }
    }
  }, [props.getTaskResponse]);

  useEffect(() => {
    if (
      (stateObj.addTaskResponse === null && props.addTaskResponse !== null) ||
      stateObj.addTaskResponse !== props.addTaskResponse
    ) {
      setStateObj({ ...stateObj, addTaskResponse: props.addTaskResponse });
      if (props.addTaskResponse?.responseCode === "TASK_ADD_SUCCESS") {
        const snackProps: ISnackBar = {
          title: "Task Adding Success",
          isOpen: true,
          color: "success",
          variant: "solid",
        };
        setAppDataContext({
          ...appDataContext,
          isOpenDialog: false,
          dialogTitle: "",
          dialogContent: null,
        });
        props.onShowSnackBar(snackProps);
      }
      if (props.addTaskResponse?.responseCode === "TASK_ADD_FAILED") {
        const snackProps: ISnackBar = {
          title: "Task Adding Failed",
          message: props.addTaskResponse.error,
          isOpen: true,
          color: "danger",
          variant: "outlined",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.addTaskResponse]);

  useEffect(() => {
    if (
      (stateObj.priorityResponse === null && props.priorityResponse !== null) ||
      stateObj.priorityResponse !== props.priorityResponse
    ) {
      setStateObj({ ...stateObj, ownerResponse: props.priorityResponse });
      if (props.priorityResponse?.responseCode === "GET_PRIORITY_SUCCESS") {
        setPriorities(props.priorityResponse?.data);
      }
    }
  }, [props.priorityResponse]);

  useEffect(() => {
    if (
      (stateObj.statusResponse === null && props.statusResponse !== null) ||
      stateObj.statusResponse !== props.statusResponse
    ) {
      setStateObj({ ...stateObj, statusResponse: props.statusResponse });
      if (props.statusResponse?.responseCode === "GET_STATUS_SUCCESS") {
        setStatus(props.statusResponse?.data);
      }
    }
  }, [props.statusResponse]);

  useEffect(() => {
    const request: IGeneralRequest = {
      projectId: props.project?.id,
    };
    props.onGetOwners(request);
    props.onGetPriorities(request);
    props.onGetStatus(request);
  }, []);

  const initData = (data: any) => {
    const { input } = inputObject;
    input["title"] = data?.title;
    input["description"] = data?.description;
    setOwner(data?.owner);
    setSelectedPriority(data?.priority?.name);
    setSelectedStatus(data?.status?.name);
    const actualStartTime = Number.parseInt(
      data?.scheduled_start_time?.value as string
    );
    const actualEndTime = Number.parseInt(
      data?.scheduled_end_time?.value as string
    );
    if (!isNaN(actualStartTime)) {
      setTaskActualStartTime(new Date(actualStartTime));
    }
    if (!isNaN(actualEndTime)) {
      setTaskActualEndTime(new Date(actualEndTime));
    }
    setInputObject({ ...inputObject, input: input });
  };

  const handlingInput = (event: any) => {
    const { input } = inputObject;
    input[event.nativeEvent.target.name] = event.nativeEvent.target.value;
    setInputObject({ ...inputObject, input: input });
  };

  const handleSetPriority = (event: any, value: any) => {
    if (value !== null) {
      setSelectedPriority(value);
    }
  };

  const handleSetStatus = (event: any, value: any) => {
    if (value !== null) {
      setSelectedStatus(value);
    }
  };
  const handlingClose = () => {
    setAppDataContext({ ...appDataContext, isOpenDialog: false });
  };

  const handlingCreateTask = () => {
    const p: IPriority = priorities.filter(
      (p: IPriority) => p.name === selectedPriority
    )?.[0];
    const s: IStatus = status.filter(
      (s: IStatus) => s.name === selectedStatus
    )?.[0];
    const taskObject: ITask = {
      task: {
        percentage_completion: undefined,
        estimated_effort_hours: undefined,
        email_before: "3600000",
        description: inputObject?.input?.description,
        title: inputObject?.input?.title,
        additional_cost: undefined,
        actual_end_time: {
          value: taskActualEndTime?.getTime().toString() ?? "",
        },
        actual_start_time: {
          value: taskActualStartTime?.getTime().toString() ?? "",
        },
        owner: {
          id: owner?.id,
          email_id: owner?.email_id,
        },
        priority: {
          name: p?.name,
          id: p?.id,
        },
        scheduled_end_time: {
          value: taskActualEndTime?.getTime().toString() ?? "",
        },
        estimated_effort_minutes: undefined,
        estimated_effort_days: undefined,
        task_type: null,
        scheduled_start_time: {
          value: taskActualStartTime?.getTime().toString() ?? "",
        },
        status: {
          name: s?.name,
          id: s?.id,
        },
      },
    };
    props.onAddTask(taskObject, appDataContext.project?.id);
  };

  const handlingEditTask = () => {
    const p: IPriority = priorities.filter(
      (p: IPriority) => p.name === selectedPriority
    )?.[0];
    const s: IStatus = status.filter(
      (s: IStatus) => s.name === selectedStatus
    )?.[0];
    if (s.name === "Closed" && worklogs?.length === 0) {
      setError({
        isEnable: true,
        message: "Cannot close this task without worklog",
      });
    } else {
      setError({ isEnable: false, message: "" });
      const taskObject: ITask = {
        task: {
          percentage_completion: undefined,
          estimated_effort_hours: undefined,
          email_before: "3600000",
          description: inputObject?.input?.description,
          title: inputObject?.input?.title,
          additional_cost: undefined,
          actual_end_time: {
            value: taskActualEndTime?.getTime().toString() ?? "",
          },
          actual_start_time: {
            value: taskActualStartTime?.getTime().toString() ?? "",
          },
          owner: {
            id: owner?.id,
            email_id: owner?.email_id,
          },
          priority: {
            name: p?.name,
            id: p?.id,
          },
          scheduled_end_time: {
            value: taskActualEndTime?.getTime().toString() ?? "",
          },
          estimated_effort_minutes: undefined,
          estimated_effort_days: undefined,
          task_type: null,
          scheduled_start_time: {
            value: taskActualStartTime?.getTime().toString() ?? "",
          },
          status: {
            name: s?.name,
            id: s?.id,
          },
        },
      };
      props.onUpdateTask(taskObject, props.project?.id, props.selectedTask?.id);
    }
  };

  return (
    <React.Fragment>
      <Box>
        <Typography level="title-sm" sx={{ fontWeight: "bold" }}>
          Project : {props.project?.title}
        </Typography>
        <Typography level="title-sm">
          Project ID: {props.project?.id}
        </Typography>
        {error.isEnable && (
          <Typography level="body-sm" sx={{ color: "red", pt: 1 }}>
            Error: {error.message ?? ""}
          </Typography>
        )}
        <Box sx={{ padding: 1 }}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              onChange={handlingInput}
              name={"title"}
              value={inputObject.input?.title ?? ""}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              onChange={handlingInput}
              name={"description"}
              value={inputObject.input?.description ?? ""}
              minRows={3}
            />
          </FormControl>
          <Typography level="title-sm">Time</Typography>
          <Card variant="outlined">
            <Stack
              // direction={"row"}
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
            >
              <FormControl>
                <FormLabel>Start Time *</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    onChange={(value) => setTaskActualStartTime(value)}
                    value={taskActualStartTime}
                    ampm={false}
                    sx={{ width: 250 }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl>
                <FormLabel>End Time *</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    onChange={(value) => setTaskActualEndTime(value)}
                    value={taskActualEndTime}
                    ampm={false}
                    sx={{ width: 250 }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Stack>
          </Card>

          <Stack
            // direction={"row"}
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
          >
            <FormControl sx={{ width: 200 }}>
              <FormLabel>Assign</FormLabel>
              <Input disabled value={owner?.email_id} name={"owner"} />
            </FormControl>
            <FormControl sx={{ width: 200 }}>
              <FormLabel>Priority</FormLabel>

              <Select
                value={selectedPriority}
                defaultValue={selectedPriority}
                onChange={handleSetPriority}
              >
                {priorities?.map((priority: any, index: number) => (
                  <Option key={index} value={priority?.name}>
                    {priority?.name}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 200 }}>
              <FormLabel>Status</FormLabel>

              <Select
                value={selectedStatus}
                defaultValue={selectedStatus}
                onChange={handleSetStatus}
              >
                {status?.map((s: any, index: number) => (
                  <Option key={index} value={s?.name}>
                    {s?.name}
                  </Option>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <CardActions buttonFlex="0 1 120px">
          <Button variant="outlined" color="neutral" onClick={handlingClose}>
            Close
          </Button>
          {props.isEdit === false && (
            <Button
              onClick={handlingCreateTask}
              variant="solid"
              color="primary"
            >
              Create
            </Button>
          )}
          {props.isEdit === true && (
            <Button onClick={handlingEditTask} variant="solid" color="primary">
              Update
            </Button>
          )}
        </CardActions>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    ownerResponse: state.task.ownerResponse,
    priorityResponse: state.task.priorityResponse,
    statusResponse: state.task.statusResponse,
    addTaskResponse: state.task.addTaskResponse,
    getTaskResponse: state.task.getTaskResponse,
    getWorklogsResponse: state.worklog.getWorklogsResponse,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetOwners: (payload: IGeneralRequest) =>
      dispatch(getOwnersByProjectById(payload)),
    onGetPriorities: (payload: IGeneralRequest) =>
      dispatch(getPriorityByProjectById(payload)),
    onGetStatus: (payload: IGeneralRequest) =>
      dispatch(getStatusByProjectById(payload)),
    onAddTask: (payload: any, projectId: string) =>
      dispatch(addTask({ payload: payload, projectId: projectId })),
    onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props)),
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
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CreateTaskDialog);
