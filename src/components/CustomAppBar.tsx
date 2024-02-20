import React, { FC, MouseEvent, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useAppDataContext } from "../context/AppDataContext";
import {
  Avatar,
  Badge,
  badgeClasses,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuList, MenuItem } from "@mui/material";

type StateObj = {
  user: any;
};
const CustomAppBar: FC = (props: any) => {
  const navigate = useNavigate();
  const { appDataContext, setAppDataContext } = useAppDataContext();
  const [stateObj, setStateObj] = useState<StateObj>({
    user: null,
  });

  // Menu List for mobile view
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };

  useEffect(() => {
    if (
      (stateObj.user === null && appDataContext.user !== null) ||
      stateObj.user !== appDataContext.user
    ) {
      setStateObj({ ...stateObj, user: appDataContext.user });
    }
  }, [appDataContext.user]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background:
            "linear-gradient(22deg, rgba(0,52,98,1) 0%, rgba(0,177,179,1) 61%);",
          boxSizing: "none",
          right: 0,
        }}
      >
        <Toolbar disableGutters sx={{ height: 50, boxSizing: "none" }}>
          <Stack
            direction={"row"}
            sx={{
              paddingLeft: 5,
              paddingRight: 5,
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <img src={"NCINGALogoWhite.png"} width={170} height={40} />
            <Stack
              spacing={1}
              direction={"row"}
              sx={{ alignItems: "center", justifyItems: "center" }}
            >
              <Box
                sx={{
                  // display: "flex",
                  display: { xs: "none", sm: "flex" },
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Badge
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeInset="14%"
                  color="success"
                  sx={{
                    [`& .${badgeClasses.badge}`]: {
                      "&::after": {
                        position: "absolute",
                        top: -2,
                        left: -2,
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        animation: "ripple 1.2s infinite ease-in-out",
                        border: "2px solid",
                        borderColor: "success.500",
                        content: '""',
                      },
                    },
                    "@keyframes ripple": {
                      "0%": {
                        transform: "scale(1)",
                        opacity: 1,
                      },
                      "100%": {
                        transform: "scale(2)",
                        opacity: 0,
                      },
                    },
                  }}
                >
                  <Avatar
                    alt={stateObj.user?.email}
                    src={stateObj.user?.picture}
                  />
                </Badge>
              </Box>
              <Stack
                spacing={1}
                direction={"row"}
                sx={{
                  alignItems: "center",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    // display: { xs: "none", sm: "flex" }, // Hide the user email according to the size of the screen
                  }}
                  level={"body-sm"}
                >
                  {stateObj.user?.email}
                </Typography>
                <IconButton
                  onClick={() => {
                    googleLogout();
                    navigate("/login", { replace: true });
                  }}
                >
                  <ExitToAppRoundedIcon />
                </IconButton>
              </Stack>
              <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                <IconButton
                  color="neutral"
                  onClick={!Boolean(anchorNav) ? openMenu : closeMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  open={Boolean(anchorNav)}
                  onClose={closeMenu}
                  sx={{ display: { xs: "flow", sm: "none" } }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuList>
                    <MenuItem>
                      <Typography
                        sx={{
                          color: "black",
                        }}
                        level={"body-sm"}
                      >
                        {stateObj.user?.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        googleLogout();
                        navigate("/login", { replace: true });
                      }}
                    >
                      Log Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CustomAppBar;
