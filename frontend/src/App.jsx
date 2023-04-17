// import Register from "./components/register/Register";
import "./App.css";
import UserProvider from "./contexts/UserContext";
import Login from "./components/login/Login";
// import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <UserProvider>
        {/* <Home />
        <Register /> */}
        <Login />
      </UserProvider>
    </div>
  );
}

export default App;
