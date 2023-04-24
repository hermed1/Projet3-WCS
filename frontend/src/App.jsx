import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Entreprise from "./pages/Entreprise";
import AddCompany from "./pages/AddCompany";
import Idea from "./pages/Idea";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar/Navbar";
import UserProvider from "./contexts/UserContext";
import Login from "./components/login/Login";
import "./App.css";
import "./style/index.scss";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  //

  return (
    <div className="App">
      <UserProvider>
        {loggedIn && <Navbar />}
        <Routes>
          {loggedIn && <Route path="/" element={<Entreprise />} />}
          {loggedIn && <Route path="/Idea" element={<Idea />} />}
          {loggedIn && <Route path="/Profil" element={<Profile />} />}
          <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<AddCompany />} />
          <Route path="/register/:id" element={<Entreprise />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
