import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {FormControlLabel, FormGroup, Switch} from '@mui/material';
import {ChangeEvent, FC} from "react";

type PropsType = {
    isDarkLightMode: boolean
    darkLightMode: (mode: boolean) => void
    logOut: () => void
    isLoggedIn: boolean
}

export const ButtonAppBar: FC<PropsType> = (props) => {
    const {isDarkLightMode, darkLightMode, logOut, isLoggedIn} = props

    const darkLightModeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        darkLightMode(e.currentTarget.checked)
    }
    const darkLight = isDarkLightMode ? "Go to Light" : "Go to Dark"

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Task_manager
                    </Typography>
                    <FormGroup>
                        {isDarkLightMode
                            ?
                            <FormControlLabel control={<Switch defaultChecked={true} onChange={darkLightModeHandler}/>}
                                              label={darkLight}
                            />
                            :
                            <FormControlLabel control={<Switch defaultChecked={false} onChange={darkLightModeHandler}/>}
                                              label={darkLight}
                            />}
                    </FormGroup>
                    {isLoggedIn && <Button onClick={logOut} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}