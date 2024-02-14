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
  Sheet,
  Table,
} from "@mui/joy";
import { RootState } from "../redux/store";
import { setSnackBar, getTasksList } from "../redux/task/task-slice";
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
  selectedTask: any;
  loadingTasks: boolean;
};

const OnDemandBar: FC<ReduxProps> = (props) => {
  const { appDataContext, setAppDataContext } = useAppDataContext();
  const { dispatch, tasksListsResponse } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState([]);

  const [stateObj, setStateObj] = useState<StateObj>({
    user: null,
    selectedTask: null,
    loadingTasks: false,
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
    if (stateObj.selectedTask === null && !stateObj.loadingTasks) {
      const request = {
        email: "tango@ncinga.net",
      };

      const fetchTasks = async () => {
        try {
          setStateObj({ ...stateObj, loadingTasks: true });
          await dispatch(getTasksList(request));
        } catch (error) {
          console.error("Error fetching tasks:", error);
        } finally {
          setStateObj({ ...stateObj, loadingTasks: false });
        }
      };

      fetchTasks();
    }
  }, [dispatch, stateObj.selectedTask, stateObj.loadingTasks]);

  const selectTaskDropdown = async () => {
    if (
      appDataContext.user.email !== null &&
      stateObj.selectedTask === null &&
      !stateObj.loadingTasks
    ) {
      const request = {
        email: "tango@ncinga.net",
      };

      try {
        if (!tasksListsResponse || !tasksListsResponse.data) {
          await dispatch(getTasksList(request));
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  const selectTask = (event: any, value: any) => {
    if (value !== undefined && value !== stateObj.selectedTask) {
      setStateObj({ ...stateObj, selectedTask: value });
    }
  };

  useEffect(() => {
    if (tasksListsResponse && Array.isArray(tasksListsResponse.data)) {
      const selectedTaskData = tasksListsResponse.data.find(
        (task) => task.title === stateObj.selectedTask
      );

      console.log("Selected Task Data:", selectedTaskData);

      if (selectedTaskData) {
        setTableData([
          {
            description: selectedTaskData.description,
            startTime:
              selectedTaskData.actual_start_time?.display_value || "N/A",
            endTime: selectedTaskData.actual_end_time?.display_value || "N/A",
            taskType: selectedTaskData.task_type?.name || "N/A",
            createdBy: selectedTaskData.created_by.email_id || "N/A",
          },
        ]);
      }
      console.log("Tasks List Response in ondemandbar:", tasksListsResponse);
    }
  }, [stateObj.selectedTask, tasksListsResponse]);

  return (
    <>
      <Box>
        <Box
          sx={{
            top: 130,
            width: "96.8%",
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
                    placeholder={
                      stateObj.selectedTask
                        ? stateObj.selectedTask.title
                        : "Task..."
                    }
                    value={stateObj.selectedTask}
                    onChange={(event, value) => selectTask(event, value)}
                    onClick={(event) => {
                      const target = event.target as HTMLInputElement;
                      if (target.tagName.toLowerCase() === "input") {
                        selectTaskDropdown();
                      }
                    }}
                    sx={{ width: 310 }}
                    // startDecorator={<CircularProgress size="sm" />}
                    disabled={stateObj.loadingTasks}
                  >
                    {tasksListsResponse &&
                    Array.isArray(tasksListsResponse.data) &&
                    tasksListsResponse.data.length > 0 ? (
                      tasksListsResponse.data.map(
                        (task: any, index: number) => (
                          <Option key={index} value={task.title}>
                            {task.title}
                          </Option>
                        )
                      )
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
                      sx={{ width: 90 }}
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
                      sx={{ width: 90 }}
                    />
                  </LocalizationProvider>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Box sx={{ marginTop: 10 }}>
            <Box
              sx={{
                height: 60,
                width: "100%",
                background: "#2596be",
                borderRadius: "10px 10px 0px 0px",
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {appDataContext.task !== null && (
                <Stack direction={"row"} spacing={2}>
                  <Stack direction={"row"} spacing={1} sx={{ paddingLeft: 1 }}>
                    <Typography
                      level={"body-md"}
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Task Predict Time :{" "}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      level={"body-md"}
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Actual Task Time :{" "}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ paddingRight: 1 }}
                  ></Stack>
                </Stack>
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sheet
                variant="outlined"
                sx={{
                  "--TableCell-height": "10px",
                  "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                  "--Table-firstColumnWidth": "80px",
                  "--Table-lastColumnWidth": "144px",
                  "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
                  "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
                  overflow: "auto",
                  background: (
                    theme
                  ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
                                linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
                                radial-gradient(
                                farthest-side at 0 50%,
                                rgba(0, 0, 0, 0.12),
                                rgba(0, 0, 0, 0)
                                ),
                                radial-gradient(
                                farthest-side at 100% 50%,
                                rgba(0, 0, 0, 0.12),
                                rgba(0, 0, 0, 0)
                                )
                                0 100%`,
                  backgroundSize:
                    "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "local, local, scroll, scroll",
                  backgroundPosition:
                    "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
                  backgroundColor: "background.surface",
                  overflowX: "auto",
                  maxWidth: "100%",
                  height: "550px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Table
                    noWrap
                    borderAxis="bothBetween"
                    stripe="odd"
                    hoverRow
                    sx={{
                      width: "100%",
                      "& tr > *:first-child": {
                        position: "sticky",
                        left: 0,
                        boxShadow: "1px 0 var(--TableCell-borderColor)",
                        bgcolor: "background.surface",
                      },
                      "& tr > *:last-child": {
                        position: "sticky",
                        right: 0,
                        bgcolor: "var(--TableCell-headBackground)",
                        width: "120px",
                      },
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: 150 }}>Description</th>
                        <th style={{ width: 100 }}>Start Time</th>
                        <th style={{ width: 100 }}>End Time</th>
                        <th style={{ width: 100 }}>Task Type</th>
                        <th style={{ width: 100 }}>Created By</th>
                      </tr>
                    </thead>

                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.description}</td>
                          <td>{row.startTime}</td>
                          <td>{row.endTime}</td>
                          <td>{row.taskType}</td>
                          <td>{row.createdBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              </Sheet>
            </Box>
          </Box>
        </Box>
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
