// import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Idea from "./pages/Idea";
import "./App.css";
import "./style/index.scss";
import UserProvider from "./contexts/UserContext";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <UserProvider>
        <Login />
        <Routes>
          <Route path="/Idea" element={<Idea />} />
          <Route path="/" element={<Idea />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
