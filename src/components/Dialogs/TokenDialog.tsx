import {FC} from "react";
import {Box, Stack, Typography} from "@mui/joy";

export enum DialogType {
    success,
    limited,
    error
}

type Props = {
    type: DialogType
}

const TokenDialog: FC<Props> = (props: any) => {
    return (<>
        <Box>
            <Stack direction={"column"}>
                <img src={"img_1.png"} width={220} height={70}/>
                {props.type === DialogType.success && <Typography level="h2" fontSize="xl">
                    Waiting for getting new access token
                </Typography>}
                {props.type === DialogType.error && <Typography level="h2" fontSize="xl">
                    Error
                </Typography>}
                {props.type === DialogType.limited && <Typography level="h2" fontSize="xl">
                    Token issue has been limited please try again later..
                </Typography>}
            </Stack>
        </Box>
    </>);
}

export default TokenDialog;
