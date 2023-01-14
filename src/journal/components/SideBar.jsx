import { useSelector } from "react-redux";

import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  Toolbar,
  Typography,
} from "@mui/material";

import { SideBarItem } from "./SideBarItem";
import Image from "mui-image";

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  return (
    <Box
      component="nav"
      sx={{
        display: { xs: "none", md: "flex" },
        width: { md: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          "& .mui-image-img": {borderRadius:'50%'}
        }}
      >
        <Toolbar sx={{justifyContent:'space-around'}}>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
          {photoURL && (
            <Grid sx={{ width:'20%', display: "flex", justifyContent: "center" }}>
              <Image
                src={photoURL}
                fit="cover"
                height="100%"
                width="100%"
                showLoading={true}
              />
            </Grid>
          )}
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
