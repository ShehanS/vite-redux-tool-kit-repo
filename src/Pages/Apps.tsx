import React, {FC} from "react";
import {Outlet} from 'react-router-dom';
import CustomAppBar from "../Components/CustomAppBar";

const Apps: FC = () => {
    return (<React.Fragment>
        <CustomAppBar/>
        <Outlet/>
    </React.Fragment>)
}

export default Apps;
