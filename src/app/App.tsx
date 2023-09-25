import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {ButtonAppBar} from '../components/ ButtonAppBar';
import React, {useState} from 'react';
import {TodolistList} from '../features/TodolistList/TodolistList';
import Container from '@mui/material/Container';

function App() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    const mode = isDarkMode ? 'dark' : 'light'
    const customTheme = createTheme({
        palette: {primary: {main: '#1a237e'}, secondary: {main: '#8c9eff'}, mode: mode}
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline></CssBaseline>
            <div className="App">
                <ButtonAppBar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
                <Container fixed maxWidth="xl">

                    <TodolistList />

                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App