import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Entreprise from "./pages/Entreprise";
import Register from "./pages/Register";
import Idea from "./pages/Idea";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar/Navbar";
import UserProvider from "./contexts/UserContext";
import Login from "./components/login/Login";
import "./App.css";
import "./style/index.scss";
import UserEditPage from "./pages/UserEditPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <UserProvider>
        {loggedIn ? (
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Entreprise />} />
              <Route path="/Idea" element={<Idea />} />
              <Route path="/Profil" element={<Profile />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/user/:id" element={<UserEditPage />} />
            </Routes>
          </div>
        ) : (
          <Login handleLogin={handleLogin} />
        )}
        {/* <Register /> */}
      </UserProvider>
    </div>
  );
}

export default App;
