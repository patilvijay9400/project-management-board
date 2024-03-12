import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard";
import Signup from "./views/auth/Signup";
import Login from "./views/auth/Login";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [login, setLogin] = useState(false);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  // if (isAuthenticated) {
  //   setLogin(true);
  // }
  return (
    <BrowserRouter>
      {login ? (
        <Layout login={login} />
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
