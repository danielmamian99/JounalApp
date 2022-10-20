import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";


export const SideBarItem = ({ title, body, date, id, imageUrl= [] }) => {
    const dispatch = useDispatch()
    const handlerClick = useCallback(
      () => {
        dispatch(setActiveNote({title, body, date, id, imageUrl}))
      },
      [title, body, date, id],
    )
    const newTitle = useMemo(() => {
        return title.length > 17
        ? title.substring(0,17) + '...'
        : title
    }, [title])
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handlerClick}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
