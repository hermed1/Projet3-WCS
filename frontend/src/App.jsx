// import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Idea from "./pages/Idea";
import "./App.css";
import "./style/index.scss";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/Idea" element={<Idea />} />
      </Routes>
    </div>
  );
}

export default App;
