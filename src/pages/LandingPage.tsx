import React, { FC, useEffect, useState } from "react";
import { useAppDataContext } from "../context/AppDataContext";
import { RootState } from "../redux/store";
import { connect, ConnectedProps } from "react-redux";
import {
  Box,
  Chip,
  IconButton,
  Sheet,
  Stack,
  TabPanel,
  Table,
  Typography,
} from "@mui/joy";
import TaskCreateBar from "../components/MainBar";
import {
  setLoader,
  setSnackBar,
  setTodayFilter,
} from "../redux/task/task-slice";
import { ISnackBar } from "../interfaces/ISnackBar";
import CreateWorkLogDialog from "../components/Dialogs/CreateWorklog";
import {
  clearHistory,
  deleteWorklog,
  getWorklogs,
} from "../redux/worklog/worklog-slice";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { IWorklog } from "../interfaces/IWorklog";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DeleteDialog from "../components/Dialogs/DeleteDialog";
import Tabs from "@mui/joy/Tabs";
import { Pagination } from "@mui/material";

import { useNavigate } from "react-router-dom";

type StateObj = {
  user: any;
  taskListResponse: any;
  projectResponse: any;
  addTaskResponse: any;
  addWorklogResponse: any;
  getWorklogsResponse: any;
  editWorklogResponse: any;
  updateTaskResponse: any;
  getTaskResponse: any;
  deleteTaskResponse: any;
  deleteWorklogResponse: any;
  projectListResponse: any;
  isTodayFilterActive: any;
  fromDate: Date | null;
  toDate: Date | null;
};
type ReduxProps = ConnectedProps<typeof connector>;

const LandingPage: FC<ReduxProps> = (props) => {
  const [page, setPage] = useState(2);
  const [predictTime, setPredictTime] = useState<number>(0);
  const [actualTime, setActualTime] = useState<number>(0);
  const { appDataContext, setAppDataContext } = useAppDataContext();
  const [worklogs, setWorklogs] = useState<any[]>([]);
  const [taskList, setTaskList] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isTodayFilterActive, setIsTodayFilterActive] =
    useState<boolean>(false);

  const [stateObj, setStateObj] = useState<StateObj>({
    user: null,
    projectResponse: null,
    taskListResponse: null,
    projectListResponse: null,
    addTaskResponse: null,
    addWorklogResponse: null,
    getWorklogsResponse: null,
    editWorklogResponse: null,
    updateTaskResponse: null,
    getTaskResponse: null,
    deleteTaskResponse: null,
    deleteWorklogResponse: null,
    isTodayFilterActive: null,
    fromDate: null,
    toDate: null,
  });
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    initials();
  }, []);

  const initials = () => {};

  useEffect(() => {
    if (
      (stateObj.getTaskResponse === null && props.getTaskResponse !== null) ||
      stateObj.getTaskResponse !== props.getTaskResponse
    ) {
      setStateObj({ ...stateObj, getTaskResponse: props.getTaskResponse });

      if (props.getTaskResponse?.responseCode === "GET_TASK_SUCCESS") {
        if (
          props.getTaskResponse?.data?.task?.actual_start_time?.value &&
          props.getTaskResponse?.data?.task?.actual_end_time?.value
        ) {
          const startTime = Number.parseInt(
            props.getTaskResponse?.data?.task?.actual_start_time?.value
          );
          const endTime = Number.parseInt(
            props.getTaskResponse?.data?.task?.actual_end_time?.value
          );
          const diff: number = endTime - startTime;
          setPredictTime(diff);
        }
      } else if (props.getTaskResponse?.responseCode === "GET_TASK_FAILED") {
        const snackProps: ISnackBar = {
          title: "Switching task failed",
          isOpen: true,
          color: "success",
          variant: "solid",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.getTaskResponse]);

  //user
  useEffect(() => {
    if (
      (stateObj.user === null && appDataContext.user !== null) ||
      stateObj.user !== appDataContext.user
    ) {
      setStateObj({ ...stateObj, user: appDataContext.user });
    }
  }, [appDataContext.user]);

  //selected project
  useEffect(() => {
    if (
      (stateObj.projectResponse === null && props.projectResponse !== null) ||
      stateObj.projectResponse !== props.projectResponse
    ) {
      setStateObj({ ...stateObj, projectResponse: props.projectResponse });
      if (props?.projectResponse?.responseCode === "GET_PROJECT_SUCCESS") {
        setWorklogs([]);
        setPredictTime(undefined);
      }
    }
  }, [props.projectResponse]);

  //selected project
  useEffect(() => {
    if (
      (stateObj.updateTaskResponse === null &&
        props.updateTaskResponse !== null) ||
      stateObj.updateTaskResponse !== props.updateTaskResponse
    ) {
      setStateObj({
        ...stateObj,
        updateTaskResponse: props.updateTaskResponse,
      });
      if (props?.updateTaskResponse?.responseCode === "TASK_UPDATED") {
        setAppDataContext({
          ...appDataContext,
          isOpenDialog: false,
          dialogTitle: "",
          dialogContent: null,
        });
        if (props?.updateTaskResponse?.data?.task?.status?.name === "Closed") {
          setActualTime(0);
          setPredictTime(0);
          props.clearWorklog();
          setWorklogs([]);
        }
      }
    }
  }, [props.updateTaskResponse]);

  //projects
  useEffect(() => {
    if (
      (stateObj.projectListResponse === null &&
        props.projectListResponse !== null) ||
      stateObj.projectListResponse !== props.projectListResponse
    ) {
      setStateObj({
        ...stateObj,
        projectListResponse: props.projectListResponse,
      });
    }
  }, [props.projectListResponse]);

  useEffect(() => {
    if (
      (stateObj.taskListResponse === null && props.taskListResponse !== null) ||
      stateObj.taskListResponse !== props.taskListResponse
    ) {
      setStateObj({ ...stateObj, taskListResponse: props.taskListResponse });
      props.onSetLoader(false);
      if (props.taskListResponse?.responseCode === "GET_TASK_LIST_SUCCESS") {
        setTaskList(props.taskListResponse?.data);
      }
    }
  }, [props.taskListResponse]);

  useEffect(() => {
    if (
      (stateObj.addTaskResponse === null && props.addTaskResponse !== null) ||
      stateObj.addTaskResponse !== props.addTaskResponse
    ) {
      setStateObj({ ...stateObj, addTaskResponse: props.addTaskResponse });
      if (props.addTaskResponse?.responseCode === "TASK_ADD_SUCCESS") {
      }
    }
  }, [props.addTaskResponse]);

  const editWorklog = (worklog: any) => {
    setAppDataContext({
      ...appDataContext,
      isOpenDialog: true,
      dialogTitle: "Edit Worklog",
      dialogContent: <CreateWorkLogDialog worklog={worklog} isEdit={true} />,
    });
  };

  useEffect(() => {
    if (
      (stateObj.addWorklogResponse === null &&
        props.addWorklogResponse !== null) ||
      stateObj.addWorklogResponse !== props.addWorklogResponse
    ) {
      setStateObj({
        ...stateObj,
        addWorklogResponse: props.addWorklogResponse,
      });
      if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_SUCCESS") {
        const snackProps: ISnackBar = {
          title: "Worklog Adding Success",
          isOpen: true,
          color: "success",
          variant: "solid",
        };

        props.onShowSnackBar(snackProps);
        setAppDataContext({
          ...appDataContext,
          isOpenDialog: false,
          dialogTitle: "",
          dialogContent: null,
        });
      }
      if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_FAILED") {
        const snackProps: ISnackBar = {
          title: "workLog Adding Failed",
          message: props.addWorklogResponse.error,
          isOpen: true,
          color: "danger",
          variant: "outlined",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.addWorklogResponse]);

  useEffect(() => {
    if (
      (stateObj.editWorklogResponse === null &&
        props.editWorklogResponse !== null) ||
      stateObj.editWorklogResponse !== props.editWorklogResponse
    ) {
      setStateObj({
        ...stateObj,
        addWorklogResponse: props.editWorklogResponse,
      });
      if (props.editWorklogResponse?.responseCode === "WORKLOG_EDIT_SUCCESS") {
        const snackProps: ISnackBar = {
          title: "Worklog Adding Success",
          isOpen: true,
          color: "success",
          variant: "solid",
        };
        if (appDataContext?.project?.id && appDataContext?.task?.id !== null) {
          props.onGetWorklogs(
            appDataContext?.project?.id,
            appDataContext?.task?.id
          );
          props.onShowSnackBar(snackProps);
        }

        setAppDataContext({
          ...appDataContext,
          isOpenDialog: false,
          dialogTitle: "",
          dialogContent: null,
        });
      }
      if (props.editWorklogResponse?.responseCode === "WORKLOG_EDIT_FAILED") {
        const snackProps: ISnackBar = {
          title: "Worklog Editing Failed",
          message: props.editWorklogResponse.error,
          isOpen: true,
          color: "danger",
          variant: "outlined",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.editWorklogResponse]);

  useEffect(() => {
    if (
      (stateObj.addWorklogResponse === null &&
        props.addWorklogResponse !== null) ||
      stateObj.addWorklogResponse !== props.addWorklogResponse
    ) {
      setStateObj({
        ...stateObj,
        addWorklogResponse: props.addWorklogResponse,
      });
      if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_SUCCESS") {
        const snackProps: ISnackBar = {
          title: "Worklog Adding Success",
          isOpen: true,
          color: "success",
          variant: "solid",
        };

        if (appDataContext?.project?.id && appDataContext?.task?.id !== null) {
          props.onGetWorklogs(
            appDataContext?.project?.id,
            appDataContext?.task?.id
          );
          props.onShowSnackBar(snackProps);
        }

        setAppDataContext({
          ...appDataContext,
          isOpenDialog: false,
          dialogTitle: "",
          dialogContent: null,
        });
      }
      if (props.addWorklogResponse?.responseCode === "WORKLOG_ADD_FAILED") {
        const snackProps: ISnackBar = {
          title: "workLog Adding Failed",
          message: props.addWorklogResponse.error,
          isOpen: true,
          color: "danger",
          variant: "outlined",
        };
        props.onShowSnackBar(snackProps);
      }
    }
  }, [props.addWorklogResponse]);

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
        setActualTime(0);
        workLogs?.map((workLog: IWorklog) => {
          const startTime = Number.parseInt(workLog.start_time.value);
          const endTime = Number.parseInt(workLog.end_time.value);
          const diff: number = endTime - startTime;
          setActualTime((prevActualTime) => prevActualTime + diff);
        });
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

  useEffect(() => {
    if (
      (stateObj.deleteTaskResponse === null &&
        props.deleteTaskResponse !== null) ||
      stateObj.deleteTaskResponse !== props.deleteTaskResponse
    ) {
      setStateObj({
        ...stateObj,
        deleteTaskResponse: props.deleteTaskResponse,
      });
      if (props.deleteTaskResponse?.responseCode === "DELETE_TASK_SUCCESS") {
        setAppDataContext({
          ...appDataContext,
          isOpenDialog: false,
          dialogContent: null,
        });
        setWorklogs([]);
      }
    }
  }, [props.deleteTaskResponse]);

  useEffect(() => {
    if (
      (stateObj.deleteWorklogResponse === null &&
        props.deleteWorklogResponse !== null) ||
      stateObj.deleteWorklogResponse !== props.deleteWorklogResponse
    ) {
      setStateObj({
        ...stateObj,
        deleteWorklogResponse: props.deleteWorklogResponse,
      });
      if (
        props.deleteWorklogResponse?.responseCode === "WORKLOG_DELETE_SUCCESS"
      ) {
        setAppDataContext({
          ...appDataContext,
          isOpenDialog: false,
          dialogContent: null,
        });
        if (appDataContext?.project?.id && appDataContext?.task?.id !== null) {
          props.onGetWorklogs(
            appDataContext?.project?.id,
            appDataContext?.task?.id
          );
        }
      }
    }
  }, [props.deleteWorklogResponse]);

  useEffect(() => {
    props.clearWorklog();
    setWorklogs([]);
  }, []);

  const openDeleteWorklogConfirm = (data: any) => {
    setAppDataContext({
      ...appDataContext,
      isOpenDialog: true,
      dialogTitle: "Confirmation",
      dialogContent: (
        <DeleteDialog
          onDelete={handleDeleteWorklog}
          id={data.id}
          title={data?.description ?? ""}
        />
      ),
    });
  };

  const handleDeleteWorklog = (worklogId: string) => {
    props.onDeleteWorklog(
      appDataContext.project.id,
      appDataContext.task.id,
      worklogId
    );
  };

  // predictTime || actualTime === 0 ? '':''
  //predictTime <= actualTime ? '#be2565' :

  //////////////////////////////////// Filter Logic /////////////////////////////////////////////////////
  // useEffect(() => {}, [props.isTodayFilterActive, stateObj.fromDate, stateObj.toDate]);

  // const filteredWorklogs = worklogs.filter((log) => {
  //   const logDate = new Date(log.date).toDateString();

  //   if (props.isTodayFilterActive) {
  //     const today = new Date().toDateString();
  //     console.log(today)

  //     return logDate === today;
  //   } else if (stateObj.fromDate && stateObj.toDate) {
  //     return new Date(log.date) >= stateObj.fromDate && new Date(log.date) <= stateObj.toDate;
  //   }

  //   return true;
  // });

  ///////////////////////Logic (december 18 is hardcoded) ////////////////////
  useEffect(() => {}, [
    props.isTodayFilterActive,
    stateObj.fromDate,
    stateObj.toDate,
  ]);

  console.log("From Date:", stateObj.fromDate);
  console.log("To Date:", stateObj.toDate);

  const filteredWorklogs = worklogs.filter((log) => {
    const logStartTime = new Date(Number.parseInt(log?.start_time?.value));
    const logEndTime = new Date(Number.parseInt(log?.end_time?.value));

    if (props.isTodayFilterActive) {
      const today = new Date(2023, 11, 18);
      console.log("Today:", today);
      console.log("Log Start Time:", logStartTime);
      console.log("Log End Time:", logEndTime);

      const isToday =
        logStartTime.getDate() === today.getDate() &&
        logStartTime.getMonth() === today.getMonth() &&
        logStartTime.getFullYear() === today.getFullYear();

      const isSameDay =
        isToday && logStartTime.getDate() === logEndTime.getDate();

      console.log("Is Today:", isToday);
      console.log("Is Same Day:", isSameDay);

      return isSameDay;
    } else if (props.fromDate && props.toDate) {
      const isInDateRange =
        logStartTime >= props.fromDate &&
        logStartTime <= props.toDate &&
        logEndTime >= props.fromDate &&
        logEndTime <= props.toDate;
      return isInDateRange;
    }

    return true;
  });
  //////////////////////////////////////////

  return (
    <>
      <Tabs>
        <TabPanel>
          <Box>
            <TaskCreateBar />
          </Box>
          <Box sx={{ marginTop: 1 }}>
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
                    {predictTime !== undefined ? (
                      <Typography level={"body-md"}>
                        {" "}
                        Month(s) {new Date(
                          predictTime
                        ).getUTCMonth()} Day(s){" "}
                        {new Date(predictTime).getUTCDate() - 1} Hour(s){" "}
                        {new Date(predictTime).getUTCHours()}
                      </Typography>
                    ) : (
                      <Typography level={"body-md"}>Time not define</Typography>
                    )}
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      level={"body-md"}
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      Actual Task Time :{" "}
                    </Typography>
                    {actualTime !== 0 && (
                      <Typography level={"body-md"}>
                        {" "}
                        Month(s) {new Date(
                          actualTime
                        ).getUTCMonth()} Day(s){" "}
                        {new Date(actualTime).getUTCDate() - 1} Hour(s){" "}
                        {new Date(actualTime).getUTCHours()}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction={"row"} spacing={1} sx={{ paddingRight: 1 }}>
                    {predictTime <= actualTime && (
                      <Chip color={"danger"}>
                        You behind with predicted time
                      </Chip>
                    )}
                  </Stack>{" "}
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
                  // the number is the amount of the header rows.
                  "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                  "--Table-firstColumnWidth": "80px",
                  "--Table-lastColumnWidth": "144px",
                  // background needs to have transparency to show the scrolling shadows
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
                  height: "450px",
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
                        <th style={{ width: 100 }}>Worklog Type</th>
                        {/*<th style={{width: 100}}>Owner</th>*/}
                        <th style={{ width: 100 }}>Created By</th>
                        <th style={{ width: 50 }} />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredWorklogs?.map((row: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: row?.description,
                              }}
                            />
                          </td>
                          <td>
                            <Stack direction={"row"} spacing={1}>
                              <Typography level={"body-sm"}>
                                {new Date(
                                  Number.parseInt(row?.start_time?.value)
                                ).toLocaleDateString() ?? ""}
                              </Typography>
                              <Chip color="primary">
                                {new Date(
                                  Number.parseInt(row?.start_time?.value)
                                ).toLocaleTimeString()}
                              </Chip>
                            </Stack>
                          </td>
                          <td>
                            <Stack direction={"row"} spacing={1}>
                              <Typography level={"body-sm"}>
                                {new Date(
                                  Number.parseInt(row?.end_time?.value)
                                ).toLocaleDateString()}
                              </Typography>
                              <Chip color="primary">
                                {new Date(
                                  Number.parseInt(row?.end_time?.value)
                                ).toLocaleTimeString()}
                              </Chip>
                            </Stack>
                          </td>
                          <td>{row?.worklog_type?.name ?? ""}</td>
                          {/*<td>{row?.owner?.email_id ?? ""}</td>*/}
                          <td>{row?.created_by?.email_id ?? ""}</td>
                          <td>
                            <Stack
                              direction={"row"}
                              sx={{ display: "flex", gap: 1 }}
                            >
                              <IconButton
                                color="primary"
                                onClick={() => editWorklog(row)}
                                variant="soft"
                              >
                                <BorderColorRoundedIcon />
                              </IconButton>

                              <IconButton
                                color="danger"
                                onClick={() => openDeleteWorklogConfirm(row)}
                                variant="soft"
                              >
                                <DeleteForeverRoundedIcon />
                              </IconButton>
                            </Stack>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              </Sheet>
            </Box>
          </Box>
          <Pagination
            count={20}
            color="primary"
            sx={{
              height: 50,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </TabPanel>
      </Tabs>
    </>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    refreshTokenPayload: state.token.refreshTokenPayload,
    refreshTokenError: state.token.error,
    taskListResponse: state.task.taskListResponse,
    isLoading: state.task.isLoading,
    addTaskResponse: state.task.addTaskResponse,
    addWorklogResponse: state.worklog.addWorklogResponse,
    getWorklogsResponse: state.worklog.getWorklogsResponse,
    editWorklogResponse: state.worklog.editWorklogResponse,
    projectResponse: state.task.projectResponse,
    updateTaskResponse: state.task.updateTaskResponse,
    getTaskResponse: state.task.getTaskResponse,
    deleteTaskResponse: state.task.deleteTaskResponse,
    deleteWorklogResponse: state.worklog.deleteWorklogResponse,
    projectListResponse: state.task.projectListResponse,
    isTodayFilterActive: state.task.isTodayFilterActive,
    fromDate: state.task.fromDate,
    toDate: state.task.toDate,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTodayFilter: () => dispatch(setTodayFilter()),
    clearWorklog: () => dispatch(clearHistory()),
    onShowSnackBar: (props: ISnackBar) => dispatch(setSnackBar(props)),
    onSetLoader: (payload: boolean) => dispatch(setLoader(payload)),
    onDeleteWorklog: (projectId: string, taskId: string, worklogId: string) =>
      dispatch(
        deleteWorklog({
          projectId: projectId,
          taskId: taskId,
          worklogId: worklogId,
        })
      ),
    onGetWorklogs: (projectId: string, taskId: string) =>
      dispatch(
        getWorklogs({
          projectId: projectId,
          taskId: taskId,
        })
      ),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
