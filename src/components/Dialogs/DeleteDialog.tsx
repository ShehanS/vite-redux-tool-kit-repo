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
    id: string;
    title?: string | undefined;
    onDelete?:(id: string) => void;
}

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & OwnProps;


const DeleteDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    useEffect(()=>{
        props.onDeleteHistory()
    }, []);



    return (<>
        <DialogContent>
            Are you sure you want to delete {props.title}?
        </DialogContent>
        <DialogActions>
            <Button variant="solid" color="danger" onClick={()=> props.onDelete?.(props.id as string)}>
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

    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DeleteDialog);
