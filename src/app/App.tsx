import React, {useCallback} from 'react';
import {TodolistList} from '../features/TodolistList/TodolistList';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {ButtonAppBar} from '../components/ ButtonAppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppDispatch, useAppSelector} from '../state/store';
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import {darkLightModeAC} from '../state/appReducer';

function App() {

    const status = useAppSelector(state => state.app.status)
    const isDarkMode = useAppSelector(state => state.app.isDarkMode)
    const dispatch = useAppDispatch()

    const darkLightMode = useCallback((mode: boolean) => {
        dispatch(darkLightModeAC(mode))
    }, [dispatch])

    const customTheme = createTheme({
        palette: {primary: {main: '#414b6e'}, secondary: {main: '#5461a2'}, mode: isDarkMode ? 'dark' : 'light'}
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline></CssBaseline>
            <div className="App">
                <ButtonAppBar isDarkMode={isDarkMode} darkLightMode={darkLightMode}/>
                {status === 'loading' && <LinearProgress color="success" />}
                <Container fixed maxWidth="xl">
                    <TodolistList />
                </Container>
                <ErrorSnackbar />
            </div>
        </ThemeProvider>
    )
}

export default App