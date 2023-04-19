import { Route, Routes } from "react-router-dom";
import Enterprise from "./pages/Enterprise";
// import Home from "./pages/Home";
import Idea from "./pages/Idea";
import "./App.css";
import UserProvider from "./contexts/UserContext";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <UserProvider>
          <Login />
          <Route path="/" element={<Idea />} />
        </UserProvider>
        <Enterprise />
      </Routes>
    </div>
  );
}

export default App;
