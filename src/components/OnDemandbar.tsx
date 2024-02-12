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
  setLoader,
  setResetState,
  setSnackBar,
} from "../redux/task/task-slice";
import { connect, ConnectedProps } from "react-redux";
import { useAppDataContext } from "../context/AppDataContext";
import { ISnackBar } from "../interfaces/ISnackBar";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PatternRoundedIcon from "@mui/icons-material/PatternRounded";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getTasksList } from "../redux/task/task-slice";

type ReduxProps = ConnectedProps<typeof connector>;

type StateObj = {
  user: any;
};

const OnDemandBar: FC<ReduxProps> = (props) => {
  const { appDataContext, setAppDataContext } = useAppDataContext();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isTaskLoading, setTaskIsLoading] = useState<boolean>(false);

  const [stateObj, setStateObj] = useState<StateObj>({
    user: null,
  });

  useEffect(() => {
    if (
      (stateObj.user === null && appDataContext.user !== null) ||
      stateObj.user !== appDataContext.user
    ) {
      setStateObj({ ...stateObj, user: appDataContext.user });
    }
  }, [appDataContext.user]);

  useEffect(() => {
    if (props.tasksListsResponse && Array.isArray(props.tasksListsResponse)) {
      setTasks(props.tasksListsResponse);
      props.onSetLoader(false);
    }
  }, [props.tasksListsResponse]);

  const getTasks = () => {
    setTaskIsLoading(true);
    const request = {
      email: "tango@ncinga.net",
    };
    props.dispatch(getTasksList(request));
  };

  useEffect(() => {
    console.log("Tasks before mapping:", tasks);
  }, [tasks]);

  return (
    <>
      <Box
        sx={{
          top: 130,
          width: "97%",
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
                  Task
                </Typography>
                <Select
                  disabled={false}
                  onClick={() => getTasks()}
                  placeholder="Task..."
                  sx={{ width: 270 }}
                  startDecorator={
                    isTaskLoading && <CircularProgress size="sm" />
                  }
                >

                  {tasks?.map((task: any, index: number) => (
                    <Option key={index} value={task}>
                      {task?.title}
                    </Option>
                  ))}
                </Select>
                <IconButton
                  disabled={false}
                  color="primary"
                  sx={{ background: "#0ca59d" }}
                  variant="solid"
                >
                  <AddCircleRoundedIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  sx={{ background: "#fc8441" }}
                  variant="solid"
                >
                  <BorderColorRoundedIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  sx={{ background: "#e85153" }}
                  variant="solid"
                >
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </Stack>
              <Stack>
                <Button variant={"outlined"}>
                  <PatternRoundedIcon />
                  Worklog
                </Button>
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
                <Button>Today</Button>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="From"
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="To"
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    tasksListsResponse: state.task.tasksListsResponse,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch,
    onSetLoader: (payload: boolean) => dispatch(setLoader(payload)),
    onReset: () => dispatch(setResetState()),
    onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(OnDemandBar);
