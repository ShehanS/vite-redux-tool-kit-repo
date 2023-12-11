import {FC, useEffect, useState} from "react";
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../redux/store";
import {deleteTaskById, deleteTaskByIdResponseClear, getTask} from "../../redux/task/task-slice";
import {IGeneralRequest} from "../../interfaces/IGeneralRequest";


type OwnProps = {
    projectId: string;
    taskId: string | undefined;
    taskTitle: string | undefined;
}

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;

type StateObj = {
    deleteTaskResponse: any;
}

const DeleteDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        deleteTaskResponse: null
    });

    const onDelete = () => {
        props.onDelete(props.projectId, props.taskId);
        const request = {
            projectId: props.projectId
        }
        props.onGetTasks(request);
    }

    useEffect(()=>{
        props.onDeleteHistory()
    }, []);


    useEffect(() => {
        if ((stateObj.deleteTaskResponse === null && props.deleteTaskResponse !== null) || (stateObj.deleteTaskResponse !== props.deleteTaskResponse)) {
            setStateObj({...stateObj, deleteTaskResponse: props.deleteTaskResponse});
            if (props.deleteTaskResponse?.responseCode === "DELETE_TASK_SUCCESS") {
                setAppDataContext({...appDataContext, isOpenDialog: false, dialogContent: null})
            }
        }

    }, [props.deleteTaskResponse]);

    return (<>
        <DialogContent>
            Are you sure you want to delete {props.taskTitle}?
        </DialogContent>
        <DialogActions>
            <Button variant="solid" color="danger" onClick={onDelete}>
                YES
            </Button>
            <Button variant="plain" color="neutral"
                    onClick={() => setAppDataContext({...appDataContext, isOpenDialog: false})}>
                NO
            </Button>
        </DialogActions>
    </>)
}
const mapStateToProps = (state: RootState) => {
    return {
        deleteTaskResponse: state.task.deleteTaskResponse
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetTasks: (payload: IGeneralRequest) => dispatch(getTask(payload)),
        onDeleteHistory: () => dispatch(deleteTaskByIdResponseClear()),
        onDelete: (projectId: string, taskId: string) => dispatch(deleteTaskById({
            projectId: projectId,
            taskId: taskId
        }))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DeleteDialog);
