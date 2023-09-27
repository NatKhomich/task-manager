import React, {useState} from 'react';
import {TodolistList} from '../features/TodolistList/TodolistList';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {ButtonAppBar} from '../components/ ButtonAppBar';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from '../state/store';

function App() {

    const status = useAppSelector(state => state.app.status)

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    const mode = isDarkMode ? 'dark' : 'light'
    const customTheme = createTheme({
        palette: {primary: {main: '#283772'}, secondary: {main: '#8c9eff'}, mode: mode}
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline></CssBaseline>
            <div className="App">
                <ButtonAppBar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>

                {status === 'loading' && <LinearProgress color="success" />}

                <Container fixed maxWidth="xl">
                    <TodolistList />
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App