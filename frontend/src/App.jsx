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
      <UserProvider>
        <Login />
        <Enterprise />

        <Routes>
          <Route path="/" element={<Idea />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
