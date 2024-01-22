import React from "react"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Header } from "app/ui/application/Header/Header"
import { useApp } from "app/lib"
import { Routing } from "app/ui/application/Routing/Routing"
import Container from "@mui/material/Container"

function App() {

  const {
    isDarkLightMode, isInitialized, status, isLoggedIn, customTheme
  } = useApp()

  if (!isInitialized) {
    return <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
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
      <Container maxWidth="xl">
        <Routing />
        <ErrorSnackbar />
      </Container>
    </ThemeProvider>
  )
}

export default App