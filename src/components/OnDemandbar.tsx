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
  getTasksList,
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

type ReduxProps = ConnectedProps<typeof connector>;

type StateObj = {
  user: any;
};

const OnDemandBar: FC<ReduxProps> = (props) => {
  const { appDataContext, setAppDataContext } = useAppDataContext();
  const { tasksListsResponse, dispatch } = props;
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const [stateObj, setStateObj] = useState<StateObj>({
    user: null,
  });

  useEffect(() => {
    dispatch(getTasksList({}));
  }, [dispatch]);

  
  const selectTaskDropdown = () => {
    if (appDataContext.user.email !== null) {
      const request = {
        email: "tango@ncinga.net",
      };
      // Assuming you have the onGetProjects action
      dispatch(getTasksList(request));
    }
  };

  const selectTask = (event: any, value: any) => {
    if (value !== null) {
      dispatch(setLoader(true));
      setSelectedTask(value);
      dispatch(getTasksList({ projectId: value?.id }));
    }
  };

  useEffect(() => {
    console.log("Tasks List Response:", tasksListsResponse);

    if (
      (stateObj.user === null && appDataContext.user !== null) ||
      stateObj.user !== appDataContext.user
    ) {
      setStateObj({ ...stateObj, user: appDataContext.user });
    }
  }, [appDataContext.user]);

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
                  placeholder="Task..."
                  value={props.tasksListsResponse}  // Use props.tasksListsResponse directly
                  onChange={(event, value) => selectTask(event, value)}
                  onClick={selectTaskDropdown}
                  sx={{ width: 270 }}
                  startDecorator={<CircularProgress size="sm" />}
                >
                  {Array.isArray(props.tasksListsResponse) &&
                  props.tasksListsResponse.length > 0 ? (
                    props.tasksListsResponse.map((task: any, index: number) => (
                      <Option key={index} value={task}>
                        {task?.title}
                      </Option>
                    ))
                  ) : (
                    <Option value="">No tasks available</Option>
                  )}
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
    onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(OnDemandBar);
