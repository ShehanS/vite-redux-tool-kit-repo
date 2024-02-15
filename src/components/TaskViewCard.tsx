import {FC} from "react";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

type Props = {
    task: any
}

const TaskViewCard: FC<Props> = ({task}) => {
    return (<>
        <Card
            variant="outlined"
            sx={{
                width: 320,
                overflow: 'auto',
                resize: 'horizontal',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
            </Box>
            <CardContent>
                <Typography level="title-lg">{task?.title ?? "Untitled"}</Typography>
                <Typography level="body-sm">
                    Project : {task?.project?.title ?? "No Descriptions"}
                </Typography>
                <Typography level="body-sm">
                    Project ID : {task?.project?.id ?? "No Descriptions"}
                </Typography>
                <Typography level="body-sm">
                    {task?.description ?? "No Descriptions"}
                </Typography>
                <Typography level="body-sm">
                    Created by : {task?.created_by?.email_id ?? ""}
                </Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
                {/*<IconButton variant="outlined" color="neutral" sx={{mr: 'auto'}}>*/}
                {/*    <FavoriteBorder/>*/}
                {/*</IconButton>*/}
                <Button variant="outlined" color="neutral">
                    View Task
                </Button>
                <Button variant="solid" color="primary">
                    Create Task
                </Button>
            </CardActions>
        </Card>
    </>);

}
export default TaskViewCard;
