import React, {FC, useState} from "react"
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import {useAppDataContext} from "../context/AppDataContext";
import {Box, DialogTitle, Divider, ModalDialog} from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
type StateObj = {
    isOpen: boolean;
}


const Dialog: FC = (props: any) => {
    const matches = useMediaQuery('(min-width:600px)');
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        isOpen: false
    });

    if (appDataContext.isOpenDialog && !stateObj.isOpen) {
        setStateObj({...stateObj, isOpen: appDataContext.isOpenDialog});
    }
    if (!appDataContext.isOpenDialog && stateObj.isOpen) {
        setStateObj({...stateObj, isOpen: appDataContext.isOpenDialog});
    }

    return (<React.Fragment>
        <Modal
            open={stateObj.isOpen}
            onClose={() => {
                setAppDataContext({...appDataContext, isOpenDialog: false});
            }}
        >
            <ModalDialog role="alertdialog" sx={{width:matches ? 600:'100%'}}
                         layout={matches ? "center": "fullscreen"}
            ><ModalClose variant="outlined"/>
                <DialogTitle>
                   <Box sx={{height:20}}>
                       {appDataContext.dialogTitle ?? ""}
                   </Box>
                </DialogTitle>
                <Divider />
                {appDataContext.dialogContent}
            </ModalDialog>
        </Modal>
    </React.Fragment>)
}

export default Dialog;
