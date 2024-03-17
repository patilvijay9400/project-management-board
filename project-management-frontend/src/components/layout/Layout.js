import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Toaster from "../ui/Toaster";
import Dashboard from "../../views/dashboard";
import Team from "../../views/Team";
import Projects from "../../views/projects";
import Tasks from "../../views/task";
import AddProjects from "../../views/projects/components/AddProjects";
import EditProject from "../../views/projects/components/EditProject";

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
        <div className="">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/projects/addProject" element={<AddProjects/>}></Route>
            <Route path="/projects/:id" element={<EditProject/>}></Route>
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
