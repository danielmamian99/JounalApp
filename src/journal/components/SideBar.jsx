import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";

import { SideBarItem } from "./SideBarItem";
import Image from "mui-image";
import CancelIcon from '@mui/icons-material/Cancel';
import { setShowMenu } from "../../store/journal";

export const SideBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes, showMenu } = useSelector((state) => state.journal);
  const onCloseMenu = () => {
    dispatch(setShowMenu());
  }
  return (
    <Box
      component="nav"
      sx={{
        display: { xs: showMenu, md: "flex" },
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
        <Toolbar sx={{paddingLeft:{xs:'5px', md:'16px'}, justifyContent:{xs:'space-between', lg:'space-around'}}}>
          <IconButton onClick={onCloseMenu} sx={{display:{ md:'none'}}}>
            <CancelIcon/>
          </IconButton>
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
