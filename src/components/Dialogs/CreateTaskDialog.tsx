import {FC, useEffect, useState} from "react";
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
    Typography
} from "@mui/joy";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";
import {
    addTask,
    getOwnersByProjectById,
    getPriorityByProjectById,
    getStatusByProjectById
} from "../../redux/task/task-slice";
import {IGeneralRequest} from "../../interfaces/IGeneralRequest";
import {ITask} from "../../interfaces/ITask";

type OwnProps = {
    project: any;
    onCreate: (task: any) => void
    user: any;
}
type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

type StateObj = {
    ownerResponse: any;
    priorityResponse: any;
    statusResponse: any;

};
type InputObjectState = {
    input: any;
}
const CreateTaskDialog: FC<Props> = (props) => {

    const [taskStartTime, setTaskStartTime] = useState<Date>(new Date());
    const [taskEndTime, setTaskEndTime] = useState<Date>(new Date());
    const [taskActualStartTime, setTaskActualStartTime] = useState<Date>(new Date());
    const [taskActualEndTime, setTaskActualEndTime] = useState<Date>(new Date());
    const [inputObject, setInputObject] = useState<InputObjectState>({
            input: {}
        }
    );
    const [owner, setOwner] = useState<any>(null);
    const [priorities, setPriorities] = useState<any[]>([]);
    const [status, setStatus] = useState<any[]>([]);
    const [selectedPriority, setSelectedPriorities] = useState<any>(null);
    const [selectedStatus, setSelectedStatus] = useState<any>(null);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            ownerResponse: null,
            priorityResponse: null,
            statusResponse: null
        }
    );
    const handlePassNewTask = () => {
        const request = {
            projectId: props.project?.id
        }
        // props.onCreate({taskName: 'test'});
        // setAppDataContext({
        //     ...appDataContext,
        //     isOpenDialog: false,
        //     dialogContent: null
        // });
        props.onGetOwners(request);
    }

    console.log(props.user)

    useEffect(() => {
        if (
            (stateObj.ownerResponse === null && props.ownerResponse !== null) ||
            stateObj.ownerResponse !== props.ownerResponse
        ) {
            setStateObj({...stateObj, ownerResponse: props.ownerResponse});
            if (props.ownerResponse?.responseCode === "GET_TASK_OWNERS_SUCCESS") {
                const owner = props.ownerResponse?.data.filter((owner: any) => owner?.email_id === props.user?.email)?.[0];
                setOwner(owner);
            }

        }

    }, [props.ownerResponse]);


    useEffect(() => {
        if (
            (stateObj.priorityResponse === null && props.priorityResponse !== null) ||
            stateObj.priorityResponse !== props.priorityResponse
        ) {
            setStateObj({...stateObj, ownerResponse: props.priorityResponse});
            if (props.priorityResponse?.responseCode === "GET_PRIORITY_SUCCESS") {
                setPriorities(props.priorityResponse?.data)
            }

        }

    }, [props.priorityResponse]);

    useEffect(() => {
        if (
            (stateObj.statusResponse === null && props.statusResponse !== null) ||
            stateObj.statusResponse !== props.statusResponse
        ) {
            setStateObj({...stateObj, statusResponse: props.statusResponse});
            if (props.statusResponse?.responseCode === "GET_STATUS_SUCCESS") {
                setStatus(props.statusResponse?.data)
            }

        }

    }, [props.statusResponse]);

    useEffect(() => {

        const request: IGeneralRequest = {
            projectId: props.project?.id
        }
        props.onGetOwners(request);
        props.onGetPriorities(request);
        props.onGetStatus(request);
    }, []);


    const handlingInput = (event: any) => {
        const {input} = inputObject;
        input[event.nativeEvent.target.name] = event.nativeEvent.target.value;
        setInputObject({...inputObject, input: input});
    }

    const handleSetPriority = (event: any, value: any) => {
        setSelectedPriorities(value)
    }

    const handleSetStatus = (event: any, value: any) => {
        setSelectedStatus(value);

    }

    const handlingCreateTask = () => {
        const taskObject: ITask = {
            task: {
                percentage_completion: undefined,
                estimated_effort_hours: undefined,
                email_before: "3600000",
                description: inputObject?.input?.title,
                title: inputObject?.input?.description,
                additional_cost: undefined,
                actual_end_time: {
                    value: taskActualEndTime.getTime().toString(),
                },
                actual_start_time: {
                    value: taskActualStartTime.getTime().toString(),
                },
                owner: {
                    name: owner?.name,
                    id: owner?.id,
                },
                priority: {
                    name: selectedPriority?.name,
                    id: selectedPriority?.id,
                },
                scheduled_end_time: {
                    value: "1512974940000",
                },
                estimated_effort_minutes: undefined,
                estimated_effort_days: undefined,
                task_type: null,
                scheduled_start_time: {
                    value: "1421988300000",
                },
                status: {
                    name: selectedStatus?.name,
                    id: selectedStatus?.id,
                },
            },
        }
        props.onAddTask(taskObject, props.project?.id)
    }


    return (
        <>
            <Box variant="outlined"

            >
                <Typography level="title-sm">Project : {props.project?.title}</Typography>
                <Typography level="title-sm">Project : {props.project?.id}</Typography>
                <Box>
                    <FormControl>
                        <FormLabel>
                            Title
                        </FormLabel>
                        <Input onChange={handlingInput} name={"title"} value={inputObject.input?.title ?? ""}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>
                            Description
                        </FormLabel>
                        <Textarea onChange={handlingInput} name={"description"}
                                  value={inputObject.input?.description ?? ""} minRows={3}/>
                    </FormControl>
                    <Typography level="title-sm">Time</Typography>
                    <Card variant="outlined">
                        <Stack direction={"row"} spacing={1}>
                            <FormControl>
                                <FormLabel>
                                    Task Start Time
                                </FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker onChange={(value) => setTaskStartTime(value)} value={taskStartTime}
                                                    ampm={false} sx={{width: 250}}
                                                    slotProps={{textField: {size: 'small'}}}/>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    Task End Time
                                </FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker onChange={(value) => setTaskEndTime(value)} value={taskEndTime}
                                                    ampm={false} sx={{width: 250}}
                                                    slotProps={{textField: {size: 'small'}}}/>
                                </LocalizationProvider>
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                            <FormControl>
                                <FormLabel>
                                    Actual Start Time
                                </FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker onChange={(value) => setTaskActualEndTime(value)}
                                                    value={taskActualStartTime} ampm={false} sx={{width: 250}}
                                                    slotProps={{textField: {size: 'small'}}}/>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    Actual End Time
                                </FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker onChange={(value) => setTaskActualEndTime(value)}
                                                    value={taskActualEndTime} ampm={false} sx={{width: 250}}
                                                    slotProps={{textField: {size: 'small'}}}/>
                                </LocalizationProvider>
                            </FormControl>
                        </Stack>
                    </Card>
                    <Stack direction={"row"} spacing={1}>
                        <FormControl sx={{width: 200}}>
                            <FormLabel>
                                Assigner
                            </FormLabel>
                            <Input value={owner?.email_id} name={"owner"}/>
                        </FormControl>
                        <FormControl sx={{width: 200}}>
                            <FormLabel>
                                Priority
                            </FormLabel>
                            <Select value={selectedPriority} onChange={handleSetPriority}>
                                {priorities?.map((priority: any, index: number) => (
                                    <Option key={index} value={priority}>{priority?.name}</Option>
                                ))}

                            </Select>
                        </FormControl>
                        <FormControl sx={{width: 200}}>
                            <FormLabel>
                                Status
                            </FormLabel>
                            <Select value={selectedStatus} onChange={handleSetStatus}>

                                {status?.map((s: any, index: number) => (
                                    <Option key={index} value={s}>{s?.name}</Option>
                                ))}


                            </Select>
                        </FormControl>

                    </Stack>
                </Box>


                <CardActions buttonFlex="0 1 120px">
                    <Button variant="outlined" color="neutral">
                        Close
                    </Button>
                    <Button onClick={handlingCreateTask} variant="solid" color="primary">
                        Create
                    </Button>
                </CardActions>
            </Box>
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        ownerResponse: state.task.ownerResponse,
        priorityResponse: state.task.priorityResponse,
        statusResponse: state.task.statusResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetOwners: (payload: IGeneralRequest) => dispatch(getOwnersByProjectById(payload)),
        onGetPriorities: (payload: IGeneralRequest) => dispatch(getPriorityByProjectById(payload)),
        onGetStatus: (payload: IGeneralRequest) => dispatch(getStatusByProjectById(payload)),
        onAddTask: (payload: any, projectId: string) => dispatch(addTask({payload: payload, projectId: projectId})),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CreateTaskDialog);
