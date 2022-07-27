import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import { CssBaseline } from "@mui/material";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    },
    mode: "light"
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    mode: 'dark',
  }
});

function App() {
  const [light, setLight] = useState(false);

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <CssBaseline />
      <button onClick={() => setLight(!light)}>Chang Theme</button>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <Navigate to="/home" />
          }/>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>Page 404</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
