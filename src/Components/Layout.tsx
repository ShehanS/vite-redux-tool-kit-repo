import React, {FC} from "react";

import {Outlet} from "react-router-dom";

const Layout: FC = () => {
    return (<React.Fragment>
            <div style ={{position: 'absolute', left: 15, right: 15, top: 5, bottom: 10, padding: 0}}>
                <Outlet/>
            </div>
        </React.Fragment>
    )
}
export default Layout;
