import React from "react";
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/auth/ui/Login/Login";
import { TodolistList } from "features/TodolistList/ui/TodolistList";
import { Header } from "common/components/Header/Header";
import { NotFound } from "common/components/NotFound";
import { useApp } from "app/lib";

function App() {

  const {
    isDarkLightMode, isInitialized, status, isLoggedIn, customTheme
  } = useApp();

  if (!isInitialized) {
    return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}} >
      <CircularProgress />
    </div>

  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline></CssBaseline>

        <Header isDarkLightMode={isDarkLightMode}
                isLoggedIn={isLoggedIn}
        />
        {status === "loading" && <LinearProgress color="success" />}
        <Container fixed maxWidth="xl">
          <Routes>
            <Route path={"/"} element={<TodolistList />} />
            <Route path={"/login"} element={<Login />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to={"/404"} />} />
          </Routes>
        </Container>
        <ErrorSnackbar />

    </ThemeProvider>
  );
}

export default App;