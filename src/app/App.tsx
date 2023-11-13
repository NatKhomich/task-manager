import React, {useCallback, useEffect} from 'react';
import {TodolistList} from 'features/TodolistList/TodolistList';
import {CircularProgress, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {ButtonAppBar} from 'common/components/ ButtonAppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from 'common/components/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from 'features/auth/Login';
import {selectAppIsDarkMode, selectAppStatus, selectSetAppInitialized} from './appSelectors';
import {selectAuthIsLoggedIn} from 'features/auth/authSelectors';
import {useAppDispatch, useAppSelector} from 'app/store';
import {authThunks} from 'features/auth/authReducer';
import {appActions} from 'app/appReducer';

function App() {

    const status = useAppSelector(selectAppStatus)
    const isDarkMode = useAppSelector(selectAppIsDarkMode)
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
        palette: {primary: {main: '#414b6e'}, secondary: {main: '#5461a2'}, mode: isDarkMode ? 'dark' : 'light'}
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
                <ButtonAppBar isDarkMode={isDarkMode}
                              darkLightMode={darkLightMode}
                              logOutHandler={logOutHandler}
                              isLoggedIn={isLoggedIn}
                />
                {status === 'loading' && <LinearProgress color="success"/>}
                <Container fixed maxWidth="xl">
                    <Routes>
                        <Route path={'/'} element={<TodolistList/>}/>
                        <Route path={'/login'} element={<Login/>}/>

                        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path="*" element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Container>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}

export default App