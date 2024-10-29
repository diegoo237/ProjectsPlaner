import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNav from "./components/AppNav";
import Login from "./pages/loginRegister/LoginPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./pages/ProjectsPage";
import PageNotFound from "./pages/PageNotFound";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <BrowserRouter>
      <AppNav logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
