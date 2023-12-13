import React, {FC, useEffect, useState} from "react";
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

import {IGeneralRequest} from "../../interfaces/IGeneralRequest";
import {ISnackBar} from "../../interfaces/ISnackBar";
import {useAppDataContext} from "../../context/AppDataContext";
import {addWorklog, editWorklog, getTypes} from "../../redux/worklog/worklog-slice";
import {getOwnersByProjectById, setSnackBar} from "../../redux/task/task-slice";
import {IWorklogRoot} from "../../interfaces/IWorklog";

type OwnProps = {
    isEdit: boolean;
    project?: any;
    task?: any;
    user?: any;
    worklog?: any;
}
type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

type StateObj = {
    getWorklogsResponse: any;
    addWorklogResponse: any;
    editWorklogResponse: any;
    deleteWorklogResponse: any;
    ownerResponse: any;
    typesResponse: any;
    project: any;
    task: any;

};
type InputObjectState = {
    input: any;
}


const CreateWorkLogDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [workLogActualStartTime, setWorkLogActualStartTime] = useState<Date | undefined>(new Date());
    const [workLogActualEndTime, setWorkLogActualEndTime] = useState<Date | undefined>(new Date());

    const [inputObject, setInputObject] = useState<InputObjectState>({
            input: {}
        }
    );
    const [owner, setOwner] = useState<any>(null);
    const [selectedType, setSelectedType] = useState<any>(null);
    const [types, setTypes] = useState<any[]>([]);
    const [stateObj, setStateObj] = useState<StateObj>(
        {
            addWorklogResponse: null,
            editWorklogResponse: null,
            deleteWorklogResponse: null,
            getWorklogsResponse: null,
            ownerResponse: null,
            typesResponse: null,
            project: null,
            task: null
        }
    );



    useEffect(() => {
        if (
            (stateObj.typesResponse === null && props.typesResponse !== null) ||
            stateObj.typesResponse !== props.typesResponse
        ) {
            setStateObj({...stateObj, typesResponse: props.typesResponse});
            if (props.typesResponse?.responseCode === "GET_ALL_TYPE_SUCCESS") {
                setTypes(props.typesResponse?.data?.worklog_type ?? [])
            }

        }

    }, [props.typesResponse]);


    useEffect(() => {
        initData();
        props.onGetTypes(appDataContext.project.id, appDataContext.task.id);
    }, []);


    useEffect(() => {
        if (!props.isEdit) {
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
        }

    }, [props.ownerResponse]);

    const initData = () => {
        if (!props.isEdit) {
            const request: IGeneralRequest = {
                projectId: props.project?.id
            }
            props.onGetOwners(request);
        } else {
            const {input} = inputObject;
            setWorkLogActualEndTime(new Date(Number.parseInt(props?.worklog?.end_time?.value)));
            setWorkLogActualStartTime(new Date(Number.parseInt(props?.worklog?.start_time?.value)));
            setOwner(props?.worklog?.owner);
            setSelectedType(props.worklog?.worklog_type?.name ?? "");
            input['description'] = props.worklog?.description ?? "";
            setInputObject({...inputObject, input: input})
        }
    }


    const handlingInput = (event: any) => {
        const {input} = inputObject;
        input[event.nativeEvent.target.name] = event.nativeEvent.target.value;
        setInputObject({...inputObject, input: input});
    }

    const handleSelectedType = (event: any, value: any) => {
        if (value !== null) {
            setSelectedType(value);
        }

    }
    const handlingClose = () => {
        setAppDataContext({...appDataContext, isOpenDialog: false});
    }


    const handlingCreateWorkLog = () => {
        const worklog: IWorklogRoot = {
            worklog: {
                owner: {
                    id: owner.id,
                },
                end_time: {
                    value: workLogActualEndTime?.getTime().toString() ?? "",
                },
                start_time: {
                    value: workLogActualStartTime?.getTime().toString() ?? "",
                },
                description: inputObject.input?.description ?? "",
                other_charge: 1343434.4333,
                recorded_time: {
                    value: new Date().getTime(),
                },
                tech_charge: 1343434.4333,
                mark_first_response: false,
                include_nonoperational_hours: false,
                worklog_type: {
                    id: types?.filter((type: any) => type?.name === selectedType)?.[0]?.id ?? "",
                },
            },

        }
        props.onAddWOrkLog(appDataContext.project.id, appDataContext.task.id, worklog);
    }

    const handlingEditWorkLog = () => {
        const worklog: IWorklogRoot = {
            worklog: {
                owner: {
                    id: owner.id,
                },
                end_time: {
                    value: workLogActualEndTime?.getTime().toString() ?? "",
                },
                start_time: {
                    value: workLogActualStartTime?.getTime().toString() ?? "",
                },
                description: inputObject.input?.description ?? "",
                other_charge: 1343434.4333,
                recorded_time: {
                    value: new Date().getTime(),
                },
                tech_charge: 1343434.4333,
                mark_first_response: false,
                include_nonoperational_hours: false,
                worklog_type: {
                    id: types?.filter((type: any) => type?.name === selectedType)?.[0]?.id ?? "",
                },
            },

        }
        props.onUpdateWorklog(worklog, appDataContext.project?.id, appDataContext.task?.id, props.worklog?.id)
    }


    return (
        <React.Fragment>
            <Box>
                <Typography level="title-sm" sx={{fontWeight: "bold"}}>Project
                    : {appDataContext?.project?.title ?? ""}</Typography>
                <Typography level="body-sm" sx={{fontWeight: "bold"}}>Task ID:
                    : {appDataContext?.task?.id ?? ""}</Typography>

                <Box sx={{padding: 1}}>
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
                                Start Time
                            </FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker onChange={(value) => setWorkLogActualStartTime(value)}
                                                value={workLogActualStartTime} ampm={false} sx={{width: 250}}
                                                slotProps={{textField: {size: 'small'}}}/>
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                End Time
                            </FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker onChange={(value) => setWorkLogActualEndTime(value)}
                                                value={workLogActualEndTime} ampm={false} sx={{width: 250}}
                                                slotProps={{textField: {size: 'small'}}}/>
                            </LocalizationProvider>
                        </FormControl>
                    </Stack>
                </Card>

                <Stack direction={"row"} spacing={1}>
                    <FormControl sx={{width: 200}}>
                        <FormLabel>
                            Assign
                        </FormLabel>
                        <Input disabled value={owner?.email_id ?? ""} name={"owner"}/>
                    </FormControl>
                    <FormControl sx={{width: 200}}>
                        <FormLabel>
                            Worklog Type
                        </FormLabel>
                        <Select value={selectedType} defaultValue={selectedType} onChange={handleSelectedType}>
                            {types?.map((type: any, index: number) => (
                                <Option key={index} value={type?.name}>{type?.name}</Option>
                            ))}
                        </Select>
                    </FormControl>

                </Stack>
            </Box>


            <CardActions buttonFlex="0 1 120px">
                <Button variant="outlined" color="neutral" onClick={handlingClose}>
                    Close
                </Button>
                {props.isEdit === false && <Button onClick={handlingCreateWorkLog} variant="solid" color="primary">
                    Create
                </Button>}
                {props.isEdit === true && <Button onClick={handlingEditWorkLog} variant="solid" color="primary">
                    Update
                </Button>}
            </CardActions>
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        ownerResponse: state.task.ownerResponse,
        typesResponse: state.worklog.typesResponse,
        getWorklogsResponse: state.worklog.getWorklogsResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetOwners: (payload: IGeneralRequest) => dispatch(getOwnersByProjectById(payload)),
        onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props)),
        onAddWOrkLog: (projectId: string, taskId: string, payload: IWorklogRoot) => dispatch(addWorklog({
            projectId: projectId,
            taskId: taskId,
            payload: payload
        })),
        onGetTypes: (projectId: string, taskId: string) => dispatch(getTypes({
            projectId: projectId,
            taskId: taskId
        })),
        onUpdateWorklog: (payload: any, projectId: string, taskId: string, worklogId: string) => dispatch(editWorklog({
            payload: payload,
            projectId: projectId,
            taskId: taskId,
            worklogId: worklogId
        })),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CreateWorkLogDialog);
