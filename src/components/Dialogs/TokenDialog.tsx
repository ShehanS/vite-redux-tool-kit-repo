import {FC} from "react";
import {Box, Button, Stack, Typography} from "@mui/joy";
import {useAppDataContext} from "../../context/AppDataContext";
import {useNavigate} from "react-router-dom";
import {googleLogout} from '@react-oauth/google';

export enum DialogType {
    success,
    limited,
    error
}

type Props = {
    type: DialogType,
    showLogout?: boolean
}

const TokenDialog: FC<Props> = ({type, showLogout=false}) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const navigate = useNavigate();

    return (<>
        <Box>
            <Stack direction={"row"}
                   sx={{justifyItems: "center", alignItems: "center", justifyContent: "space-around"}}>
                {type === DialogType.success && <Typography level="body-sm">
                    Waiting for getting new access token from Manage Engine
                </Typography>}
                {type === DialogType.error && <Typography level="body-sm">
                    Token has been expired!!!
                </Typography>}
                {type === DialogType.limited && <Typography level="body-sm">
                    Sorry!!!. We have reach maximum token issue count please try after 10 min.<br/>
                    <Typography level="body-sm" sx={{fontSize:10}}>App will be automatically logout within 5 seconds</Typography>
                </Typography>}
                <Box sx={{paddingLeft: 2}}>
                    <img src={"logo.png"} width={50} height={50}/>
                </Box>
            </Stack>
            {showLogout && <Stack>
                <Button onClick={() => {
                    googleLogout();
                    navigate("/login", {replace: true})
                }}>Logout</Button>
            </Stack>}
        </Box>
    </>);
}

export default TokenDialog;
