import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Toaster from "../components/ui/Toaster";
import Dashboard from "../pages/Dashboard";
import Team from "../pages/Team";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";

const Layout = ({ login }) => {
  // for 3 sec want show toaster component
  const [show, setShow] = useState(login);

  setTimeout(() => {
    setShow(!login);
  }, 3000);

  return (
    <div className="">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route path="/tasks" element={<Tasks />}></Route>
          </Routes>
        </div>
      </main>
      {show && <Toaster open={login} message="Login successfully" />}
    </div>
  );
};

export default Layout;
