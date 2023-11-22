import React, {useCallback, useEffect} from 'react';
import {CircularProgress, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from 'common/components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from 'features/auth/ui/Login/Login';
import {selectAppIsDarkMode, selectAppStatus, selectSetAppInitialized} from 'app/model/appSelectors';
import {selectAuthIsLoggedIn} from 'features/auth/model/authSelectors';
import {useAppDispatch, useAppSelector} from 'app/model/store';
import {authThunks} from 'features/auth/model/authSlice';
import {appActions} from 'app/model/appSlice';
import {TodolistList} from "features/TodolistList/ui/TodolistList";
import {NotFound} from "common/components/NotFound";
import {Header} from "common/components/Header/Header";

function App() {

    const status = useAppSelector(selectAppStatus)
    const isDarkLightMode = useAppSelector(selectAppIsDarkMode)
    const isInitialized = useAppSelector(selectSetAppInitialized)
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authThunks.initializeApp())
    }, [])

    const darkLightMode = useCallback((mode: boolean) => {
        dispatch(appActions.darkLightAppMode({mode}))
    }, [dispatch])

    const customTheme = createTheme({
        palette: {primary: {main: '#414b6e'}, secondary: {main: '#5461a2'}, mode: isDarkLightMode ? 'dark' : 'light'}
    })

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logOutHandler = () => {
        dispatch(authThunks.logout())
    }

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline></CssBaseline>
            <div className="App">
                <Header isDarkLightMode={isDarkLightMode}
                              darkLightMode={darkLightMode}
                              logOut={logOutHandler}
                              isLoggedIn={isLoggedIn}
                />
                {status === 'loading' && <LinearProgress color="success"/>}
                <Container fixed maxWidth="xl">
                    <Routes>
                        <Route path={'/'} element={<TodolistList/>}/>
                        <Route path={'/login'} element={<Login/>}/>

                        <Route path="/404" element={<NotFound />}/>
                        <Route path="*" element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}

export default App