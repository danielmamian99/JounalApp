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
import Image from 'mui-image'

export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  console.log('photoURL >>>', photoURL);
  return (
    <Box
      component="nav"
      sx={{ display: { xs: 'none', md:'flex' } , width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
          {photoURL && 
          <Grid sx={{display:'flex', justifyContent:'center'}}>
            <Image src={photoURL} fit="cover" height='80%' width='50%' showLoading={true}/>
          </Grid>
          }
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
