import "./App.css";
import UserProvider from "./contexts/UserContext";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Login />
      </UserProvider>
    </div>
  );
}

export default App;
