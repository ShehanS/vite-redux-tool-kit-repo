import React, {FC} from "react";
import {GoogleLogin} from '@react-oauth/google';
import {Box, Stack, Typography} from "@mui/joy";
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
        <Box
            sx={{
                justifyContent: 'center', justifyItems: 'center', alignItems: 'center', left: 0,
                right: 0
            }}>
            <Stack spaacing={1} sx={{
                justifyItems: 'center',
                alignItems: 'center'
            }}>
                <Stack sx={{position: 'absolute', top: '45%'}}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            handleLogin(credentialResponse)
                        }}
                        onError={() => {
                        }}/>
                </Stack>
                <Box sx={{
                    justifyContent:'center',
                    alignItems:'center',
                    justifyItems:'center',
                    display:'flex',
                    position:'absolute',
                    bottom:0,
                    width:'100%',
                    height: 80,
                    background: '#00b0a9'
                }}>
                    <Stack>
                        <Typography level={"body-sm"}>
                            NCINGA Time tracker beta
                        </Typography>
                    </Stack>
                    <img src={"http://localhost/bar.png"} style={{position: 'absolute', right:0, height:80}}/>
                </Box>
            </Stack>
        </Box>
    </>);
}
export default LoginPage;

