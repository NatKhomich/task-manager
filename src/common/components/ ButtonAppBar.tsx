import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {FormControlLabel, FormGroup, Switch} from '@mui/material';

type PropsType = {
    isDarkMode: boolean
    darkLightMode: (mode: boolean)=> void
    logOutHandler: () => void
    isLoggedIn: boolean
}

export function ButtonAppBar(props: PropsType) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task_manager
                    </Typography>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked={true} onChange={(e) =>
                            props.darkLightMode(e.currentTarget.checked)}/>}
                                          label={props.isDarkMode ? "Go to Light" : "Go to Dark"}
                        />
                    </FormGroup>
                    {props.isLoggedIn && <Button onClick={props.logOutHandler} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}