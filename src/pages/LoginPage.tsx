import React, {FC} from "react";
import {GoogleLogin} from '@react-oauth/google';
import {Box, Typography} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {useAppDataContext} from "../context/AppDataContext";
import {jwtDecode} from "jwt-decode";

const LoginPage: FC = (props: any) => {
    const navigate = useNavigate();
    const {appDataContext, setAppDataContext} = useAppDataContext();

    const handleLogin = (user: any) => {
        const profile = jwtDecode(user?.credential);
        setAppDataContext({...appDataContext, user: profile});
        navigate('/landing-page', {replace: true});
    }


    return (<>
        <Box sx={{display:'flex', marginTop:'20%', justifyContent:'center', justifyItems : 'center', alignItems:'center'}}>
           <Box sx={{background:'white', borderRadius:10, padding:5}}>
               <GoogleLogin
                   onSuccess={credentialResponse => {
                       handleLogin(credentialResponse)
                   }}
                   onError={() => {
                       console.log('Login Failed');
                   }}/>
           </Box>
        </Box>
    </>);
}
export default LoginPage;

