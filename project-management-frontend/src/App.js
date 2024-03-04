import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <BrowserRouter>
      {login ? (
        <Layout login={login}/>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Login setLogin={setLogin} />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
