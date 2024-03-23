import React, {FC} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import {useNavigate} from "react-router-dom";
import Button from "@cloudscape-design/components/button";

const Login: FC = () => {
    const navigate = useNavigate();
    const {appDataContext, setAppDataContext} = useAppDataContext()

    const handleLogin = () => {
        setAppDataContext({...appDataContext, isLogged: true});
        navigate("/apps/home", {replace: true});
    }

    return (<React.Fragment>
        <Button onClick={handleLogin} variant="solid">Login</Button>
    </React.Fragment>)
}

export default Login;
