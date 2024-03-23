// import React, {FC} from "react";
// import {Sheet, Stack} from "@mui/joy";
// import Drawer from '@mui/joy/Drawer';
// import Box from "@mui/joy/Box";
// import List from '@mui/joy/List';
// import ListItem from '@mui/joy/ListItem';
// import ListItemDecorator from '@mui/joy/ListItemDecorator';
// import ListItemButton from '@mui/joy/ListItemButton';
// import {useDrawerContext} from "../context/DrawerContext";
// import {Info, OpenInNew} from "@mui/icons-material";
//
//
// const AppDrawer: FC = () => {
//     const {drawerContext, setDrawerContext} = useDrawerContext();
//
//
//     const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
//         if (
//             event.type === 'keydown' &&
//             ((event as React.KeyboardEvent).key === 'Tab' ||
//                 (event as React.KeyboardEvent).key === 'Shift')
//         ) {
//             return;
//         }
//
//         setDrawerContext({...drawerContext, isOpen: false});
//     };
//
//     return (
//         <React.Fragment>
//             <Drawer color="neutral"
//                     invertedColors={false}
//                     size="sm"
//                     variant="plain" onClose={toggleDrawer()} open={drawerContext.isOpen} anchor={"left"}
//                     slotProps={{
//                         content: {
//                             sx: {
//                                 bgcolor: 'transparent',
//                                 p: {md: 3, sm: 0},
//                                 boxShadow: 'none',
//                             },
//                         },
//                     }}
//             >
//                 <Sheet
//                     sx={{
//                         borderRadius: 'md',
//                         p: 1,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         gap: 2,
//                         width:'90%',
//                         height: '100%',
//                         overflow: 'hidden',
//                     }}
//                 >
//
//                     <Stack direction={"row"} justifyContent={"center"} paddingTop={5}>
//                         <img src="combank_logo.png" width={180} height={40}/>
//                     </Stack>
//                     <Box>
//                         <List
//                             sx={{
//                                 marginTop: 25,
//                                 width: '100%',
//                             }}
//                         >
//                             <ListItem sx={{p: 1, height: 80}}>
//                                 <ListItemButton component="a" href="/apps/process">
//                                     <ListItemDecorator>
//                                         <Info/>
//                                     </ListItemDecorator>
//                                     Process
//                                 </ListItemButton>
//                             </ListItem>
//                             <ListItem sx={{p: 1, height: 80}}>
//                                 <ListItemButton component="a" href="/apps/home">
//                                     <ListItemDecorator>
//                                         <OpenInNew/>
//                                     </ListItemDecorator>
//                                    Home
//                                 </ListItemButton>
//                             </ListItem>
//                         </List>
//
//                     </Box>
//                 </Sheet>
//             </Drawer>
//         </React.Fragment>
//     )
// }
//
// export default AppDrawer;
