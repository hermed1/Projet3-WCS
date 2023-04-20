import React from "react";
import { Route, Routes } from "react-router-dom";
import Entreprise from "./Entreprise";
import Idea from "./Idea";
import Profile from "./Profile";
import Navbar from "../components/navbar/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Entreprise />} />
        <Route path="/Idea" element={<Idea />} />
        <Route path="/Profil" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Home;
