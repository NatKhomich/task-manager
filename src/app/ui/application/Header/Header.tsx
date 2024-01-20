import * as React from "react"
import { ChangeEvent } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useAppDispatch } from "app/model/store"
import { appActions } from "app/model/appSlice"
import { authThunks } from "features/auth/model/authSlice"
import { NavLink } from "react-router-dom"
import styles from "app/ui/application/Header/Header.module.css"

type Props = {
  isDarkLightMode: boolean
  isLoggedIn: boolean
}

export const Header = ({ isLoggedIn, isDarkLightMode }: Props) => {

  const dispatch = useAppDispatch()

  const darkLightMode = (mode: boolean) => {
    dispatch(appActions.darkLightAppMode({ mode }))
  }
  const darkLightModeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    darkLightMode(e.currentTarget.checked)
  }
  const logOutHandler = () => {
    dispatch(authThunks.logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex" }}>
            <NavLink className={styles.navLink} to={"/"}>Task_manager</NavLink>
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={isDarkLightMode} onChange={darkLightModeHandler} />}
              label={isDarkLightMode ? "Go to Light" : "Go to Dark"}
            />
          </FormGroup>
          {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
