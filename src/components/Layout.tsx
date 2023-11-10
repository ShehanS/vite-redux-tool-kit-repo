import {FC, ReactNode} from "react";
import AppBar from "./CustomAppBar";
import {Box} from "@mui/joy";

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({children}) => {
    return (<>
        <AppBar/>
        <Box sx={{marginTop:10}}>
            {children}
        </Box>
    </>);
}

export default Layout;
