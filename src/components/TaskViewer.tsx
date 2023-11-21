import {FC} from "react";
import {Box, Card, CardContent, CardOverflow, Divider, Stack, Typography} from "@mui/joy";
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

type Props = {
    task?: any;
}

const TaskViewer: FC<Props> = ({task}) => {
    return (<>
        <Box sx={{padding: 1}}>
            <Card sx={{height: 130, width: '90%'}} variant="solid">
                <CardContent>
                    <Typography textColor="inherit" level={"title-lg"}>
                        Title: {task?.title ?? ""}
                    </Typography>
                    <Box sx={{height: 50, overflowY: 'auto'}}>
                        <Typography textColor="inherit" color={"primary"} level={"title-sm"}>
                            Description: {task?.description ?? "Not available"}
                        </Typography>
                    </Box>

                    <Stack direction={"row"}
                           sx={{justifyContent: "start"}} spacing={1}>
                        <AccessTimeFilledRoundedIcon fontSize="small"/>
                        <Stack direction={"row"} spacing={1} sx={{justifyContent: "space-around"}}>
                            <Typography textColor="inherit"
                                        level={"body-sm"}>
                                Start: {new Date(Number.parseInt(task?.scheduled_start_time?.value)).toLocaleTimeString() ?? "Not Assign"}
                            </Typography>
                            <Typography textColor="inherit" level={"body-sm"}>
                                End:{new Date(Number.parseInt(task?.scheduled_end_time?.value)).toLocaleTimeString() ?? "Not Assign"}
                            </Typography>
                        </Stack>
                    </Stack>

                    {/*<Stack direction={"row"} sx={{justifyContent: "space-between"}}>*/}
                    {/*    <Typography textColor="inherit" level={"body-sm"}>*/}
                    {/*        Actual Start Time:*/}
                    {/*    </Typography>*/}
                    {/*    <Typography textColor="inherit" level={"body-sm"}>*/}
                    {/*        Actual End Time:*/}
                    {/*    </Typography>*/}
                    {/*</Stack>*/}
                </CardContent>
                <CardOverflow variant="soft" sx={{bgcolor: 'background.level1'}}>
                    <Divider inset="context"/>
                    <CardContent orientation="horizontal">
                        <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                            Status: {task?.status?.name ?? "Not Assign"}
                        </Typography>
                        <Divider orientation="vertical"/>
                        <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                            Priority: {task?.priority?.name ?? "Not Assign"}
                        </Typography>
                    </CardContent>
                </CardOverflow>
            </Card>
        </Box>
    </>)
}

export default TaskViewer;
