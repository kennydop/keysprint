import { Outlet, Route, Routes } from "react-router-dom";
// import './App.css';
import LaunchPage from "./pages/LaunchPage/LaunchPage";
import TestPage from "./pages/TestPage/TestPage";
import TutorialPage from "./pages/TutorialPage/TutorialPage";
import Header from "./components/Header/Header";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
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
            <Route exact path="tutorials" element={<TutorialPage />} />
            <Route exact path="test" element={<TestPage />} />
            {/* -------------------------------------------------------- */}
          </Route>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
