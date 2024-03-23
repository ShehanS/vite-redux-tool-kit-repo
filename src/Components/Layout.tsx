import React, {FC} from "react";

import {Outlet} from "react-router-dom";
import {Box} from "@cloudscape-design/components";

const Layout: FC = () => {
    return (<React.Fragment>
            <Box sx={{position: 'absolute', left: 0, right: 0, top: 100, bottom: 0, padding: 0}}>
                <Outlet/>
            </Box>
        </React.Fragment>
    )
}
export default Layout;
