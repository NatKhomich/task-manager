import React, {useCallback, useEffect} from 'react';
import {TodolistList} from '../features/TodolistList/TodolistList';
import {CircularProgress, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {ButtonAppBar} from '../components/ ButtonAppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from '../state/store';
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import {appActions} from '../state/appReducer';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC, meTC} from '../state/authReducer';

function App() {

    const status = useAppSelector(state => state.app.status)
    const isDarkMode = useAppSelector(state => state.app.isDarkMode)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(meTC())
    }, [])

    const darkLightMode = useCallback((mode: boolean) => {
        dispatch(appActions.darkLightMode({mode} ))
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
        dispatch(logoutTC())
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
                {status === 'loading' && <LinearProgress color="success" />}
                <Container fixed maxWidth="xl" >
                    <Routes>
                        <Route path={'/todolist-practice'} element={ <TodolistList />} />
                        <Route path={'/todolist-practice/login'} element={ <Login />} />

                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                        <Route path='*' element={<Navigate to={'/404'} />} />
                    </Routes>
                </Container>
                <ErrorSnackbar />
            </div>
        </ThemeProvider>
    )
}

export default App