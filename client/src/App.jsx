import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "@/scenes/homePage";
import LoginPage from "@/scenes/loginPage";
import ProfilePage from "@/scenes/profilePage";
import MyProfile from "@/scenes/myProfile";
import Connections from "@/scenes/connections";
import LatestEvents from "@/scenes/latestEvents";
import TournamentPage from "@/scenes/tournamentPage";
import TournamentRegistrationPage from "@/scenes/tournamentRegistrationPage";
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
            <Route path="/" element={<LoginPage/>} />
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
            <Route
              path="/myprofile"
              element={isAuth?<MyProfile/>:<Navigate to="/"/>}
            />
            <Route
              path="/connections"
              element={isAuth?<Connections/>:<Navigate to="/"/>}
            />
            <Route
              path="/latestevents"
              element={isAuth?<LatestEvents/>:<Navigate to="/"/>}
            />
            <Route
              path="/tournament"
              element={isAuth?<TournamentPage/>:<Navigate to="/"/>} 
            />
            <Route
              path="/tournament/registration/:tournamentId"
              element={isAuth?<TournamentRegistrationPage/>:<Navigate to="/"/>}
            />
            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;