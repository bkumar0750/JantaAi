import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import DecisionDetail from "./pages/DecisionDetail";
import Profile from "./pages/Profile";

function AppRoutes() {
  const { userProfile } = useApp();

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="*"
        element={
          !userProfile ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/"               element={<Home />} />
                  <Route path="/ask"            element={<AskQuestion />} />
                  <Route path="/decision/:id"   element={<DecisionDetail />} />
                  <Route path="/profile"        element={<Profile />} />
                  <Route path="*"               element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </>
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
