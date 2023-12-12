import React, {FC, useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useAppDataContext} from "../context/AppDataContext";
import {Avatar, Badge, badgeClasses, Box, Stack} from "@mui/joy";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type StateObj = {
    user: any;

};
const CustomAppBar: FC = (props: any) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    const [stateObj, setStateObj] = useState<StateObj>({
        user: null
    });
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        if (
            (stateObj.user === null && appDataContext.user !== null) ||
            stateObj.user !== appDataContext.user
        ) {
            setStateObj({...stateObj, user: appDataContext.user});
        }

    }, [appDataContext.user]);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (<>
        <AppBar position="fixed" sx={{background: '#00b0a9', boxSizing: 'none', right: 0,}}>
            <Container maxWidth="100%">
                <Toolbar disableGutters sx={{height: 80, boxSizing: 'none'}}>

                    <Stack direction={"row"} sx={{justifyContent: 'space-between', width: '100%'}}>
                        <Typography level={"body-sm"}>NCINGA Time Tracker</Typography>
                        <Stack spacing={1} direction={"row"} sx={{alignItems: 'center', justifyItems: 'center'}}>
                            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                <Badge
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    badgeInset="14%"
                                    color="success"
                                    sx={{
                                        [`& .${badgeClasses.badge}`]: {
                                            '&::after': {
                                                position: 'absolute',
                                                top: -2,
                                                left: -2,
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                animation: 'ripple 1.2s infinite ease-in-out',
                                                border: '2px solid',
                                                borderColor: 'success.500',
                                                content: '""',
                                            },
                                        },
                                        '@keyframes ripple': {
                                            '0%': {
                                                transform: 'scale(1)',
                                                opacity: 1,
                                            },
                                            '100%': {
                                                transform: 'scale(2)',
                                                opacity: 0,
                                            },
                                        },
                                    }}
                                >
                                    <Avatar alt={stateObj.user?.email} src={stateObj.user?.picture}/>
                                </Badge>
                            </Box>
                            <Typography level={"body-sm"}>{stateObj.user?.email}</Typography>
                        </Stack>
                    </Stack>


                </Toolbar>
            </Container>
        </AppBar>
    </>)
}

export default CustomAppBar;
