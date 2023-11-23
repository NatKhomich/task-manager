import { useAppDispatch, useAppSelector } from "app/model/store";
import { selectAppIsDarkMode, selectAppStatus, selectSetAppInitialized } from "app/model/appSelectors";
import { selectAuthIsLoggedIn } from "features/auth/model/authSelectors";
import { useEffect } from "react";
import { authThunks } from "features/auth/model/authSlice";
import { createTheme } from "@mui/material";

export const useApp = () => {

  const status = useAppSelector(selectAppStatus)
  const isDarkLightMode = useAppSelector(selectAppIsDarkMode)
  const isInitialized = useAppSelector(selectSetAppInitialized)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  const customTheme = createTheme({
    palette: {primary: {main: '#414b6e'}, secondary: {main: '#5461a2'}, mode: isDarkLightMode ? 'dark' : 'light'}
  })

  return {
    status, customTheme, isDarkLightMode, isInitialized, isLoggedIn
  }
}