import { Route, Routes } from "react-router-dom";
import Enterprise from "./pages/Enterprise";
// import Home from "./pages/Home";
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
        {/* <Enterprise /> */}

        <Routes>
          <Route path="/" element={<Idea />} />
          <Route path="/company" element={<Enterprise />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
