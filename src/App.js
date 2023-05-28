import { Outlet, Route, Routes } from "react-router-dom";
// import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./services/firebase";
import { useEffect, useState } from "react";
import { ModeContext } from "./contexts/modeContext";
import ScoreContext from "./contexts/scoreContext";
import LaunchPage from "./pages/LaunchPage/LaunchPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import PracticePage from "./pages/PracticePage/PracticePage";
import PracticePageR from "./pages/PracticePage/PracticePageR";
import { ProgressPage } from "./pages/ProgressPage/ProgressPage";
import TutorialPage from "./pages/TutorialPage/TutorialPage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const [mode, setMode] = useState("beginner");
  const [accur, setAccur] = useState(0);
  const [wpm, setWPM] = useState(0);

  return (
    <UserProvider>
      <ModeContext.Provider value={{ mode, setMode }}>
        <ScoreContext.Provider value={{ accur, wpm, setAccur, setWPM }}>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Header />
                    <Outlet />
                  </div>
                }
              >
                <Route index path="" element={<LaunchPage />} />
                <Route exact path="menu" element={<MenuPage />} />
                <Route exact path="tutorials" element={<TutorialPage />} />
                <Route exact path="progress" element={<ProgressPage />} />
                <Route exact path="progress/:mode" element={<ProgressPage />} />
                <Route exact path="practice" element={<PracticePage />} />
                <Route exact path="practiceR" element={<PracticePageR />} />
              </Route>
            </Routes>
          </div>
        </ScoreContext.Provider>
      </ModeContext.Provider>
    </UserProvider>
  );
}

export default App;
