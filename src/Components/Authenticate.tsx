import React, {FC, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppDataContext} from "../context/AppDataContext";

const Authenticate: FC = () => {
    const navigate = useNavigate();
    const {appDataContext} = useAppDataContext()

    useEffect(() => {
        if (!appDataContext.isLogged) {
            navigate("/login", {replace: true})
        }

    }, [appDataContext.isLogged])

    return (<React.Fragment>
        <Outlet/>
    </React.Fragment>)
}

export default Authenticate;
