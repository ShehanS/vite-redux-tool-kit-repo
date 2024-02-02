import React, {FC, ReactNode, useEffect, useState} from "react";
import AppBar from "./CustomAppBar";
import {Box, Button, Snackbar, Stack, Typography} from "@mui/joy";
import {RootState} from "../redux/store";

import {connect, ConnectedProps} from "react-redux";
import {setSnackBar} from "../redux/task/task-slice";
import {ISnackBar} from "../interfaces/ISnackBar";
import {keyframes} from "@emotion/react";

type OwnProps = {
    children: ReactNode
}
type ReduxProps = ConnectedProps<typeof connector>;

type Props = OwnProps & ReduxProps
const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;
type StateObj = {
    errorResponse: any;
}
const animationDuration = 600;
const Layout: FC<Props> = (props) => {
    const [stateObj, setStateObj] = useState<StateObj>({
        errorResponse: null
    });
    const [isShow, setIsShow] = useState<boolean>(false);

    useEffect(() => {
        if (
            (stateObj.errorResponse === null && props.error !== null) ||
            stateObj.errorResponse !== props.error
        ) {
            setStateObj({...stateObj, errorResponse: props.error});

        }

    }, [props.error]);

    useEffect(()=>{
        setIsShow(props.showSnackBar.isOpen)
    }, [props.showSnackBar])

    const handleClose = () => {
        setIsShow(false)
    }
    return (<>
        <AppBar/>

        <Snackbar
            open={isShow}
            onClose={handleClose}
            variant={"outlined"}
            color={"primary"}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            animationDuration={animationDuration}
            autoHideDuration={4000}
            endDecorator={
                <Button
                    onClick={handleClose}
                    size="sm"
                    variant="soft"
                    color="primary"
                >
                    Dismiss
                </Button>}
            sx={{
                ...(open && {
                    animation: `${inAnimation} ${animationDuration}ms forwards`,
                }),
                ...(!open && {
                    animation: `${outAnimation} ${animationDuration}ms forwards`,
                }),
            }}

        >
            <Stack direction={"column"}>
            <Typography level={"title-md"}>{props.showSnackBar.title}</Typography>
            <Typography level={"body-sm"}>{props.showSnackBar.message ?? ""}</Typography>
            </Stack>
        </Snackbar>
        <Box sx={{marginTop: 10}}>
            {props.children}
        </Box>
    </>);
}

const mapStateToProps = (state: RootState) => {
    return {
        showSnackBar: state.task.showSnackBar,
        error: state.task.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Layout);
