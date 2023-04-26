import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Entreprise from "./pages/Entreprise";
import AddCompany from "./pages/AddCompany";
import Idea from "./pages/Idea";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar/Navbar";
import UserProvider from "./contexts/UserContext";
import Login from "./components/login/Login";
import IdeaContent from "./components/ideaContent/IdeaContent";
import IdeaProvider from "./contexts/IdeaContext";

import "./App.css";
import "./style/index.scss";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <UserProvider>
        <IdeaProvider>
          {loggedIn ? (
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Entreprise />} />
                <Route path="/idea" element={<Idea />} />
                <Route path="/idea/:id" element={<IdeaContent />} />
                <Route path="/profil" element={<Profile />} />
                <Route path="/addCompany" element={<AddCompany />} />
              </Routes>
            </div>
          ) : (
            <Login handleLogin={handleLogin} />
          )}
        </IdeaProvider>
      </UserProvider>
    </div>
  );
}

export default App;
