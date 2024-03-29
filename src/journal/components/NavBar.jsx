import { useDispatch } from 'react-redux';

import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';

import { startLogout } from '../../store/auth/thunks';
import { setShowMenu } from '../../store/journal';


export const NavBar = ({ drawerWidth = 240 }) => {
    const dispatch = useDispatch()
    const onLogout = ()=>{
        dispatch( startLogout() );
    }
    const handleMenu = (e) => {
        dispatch(setShowMenu())
    }

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { md: `calc(100% - ${ drawerWidth }px)` },
            ml: { md: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                onClick={handleMenu}
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { md: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton 
                color='error'
                onClick={onLogout}>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
