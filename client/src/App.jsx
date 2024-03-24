import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "@/scenes/homePage";
import LoginPage from "@/scenes/loginPage";
import ProfilePage from "@/scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";

import Modal from "react-modal";
Modal.setAppElement("#root");
import EventPage from "@/scenes/eventPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth?<HomePage/>:<LoginPage/>} />
            <Route
              path="/home"
              element={isAuth?<HomePage />:<Navigate to="/"/>}
            />
            <Route
              path="/profile/:userId"
              element={isAuth?<ProfilePage/>:<Navigate to="/"/>}
            />
            <Route
              path="/calendar"
              element={isAuth?<EventPage/>:<Navigate to="/"/>}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;