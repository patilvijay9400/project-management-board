import React, { useEffect, useState } from "react";
import Table from "../../components/ui/Table";
import { MdModeEdit } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects } from "./store/projectsSlice";
import { Link } from "react-router-dom";

const Projects = () => {
  // get all projects api
  // const [projects, setProjects] = useState([]);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const loading = useSelector((state) => state.projects.loading);

  // const fetchData = async () => {
  //   try {
  //     let response = await fetch("http://localhost:5000/api/projects/");
  //     if (!response.ok) throw new Error("HTTP error " + response.status);
  //     const projects = await response.json();
  //     setProjects(projects);
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  const onEdit = (projectId) => {
    // Perform the desired action based on the project ID
    console.log(`Perform action for project with ID ${projectId}`);
  };
  const onView = (projectId) => {
    // Perform the desired action based on the project ID
    console.log(`Perform action for project with ID ${projectId}`);
  };
  const onDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(projectId));
    }
  };
  const columns = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title" },
    { key: "description", title: "Description" },
    { key: "assigned_to", title: "Assigned To" },
    { key: "start_date", title: "Start Date" },
    { key: "end_date", title: "End Date" },
    { key: "status", title: "Status" },
    { key: "priority", title: "Priority" },
    {
      key: "action",
      title: "Action",
      render: (project) => (
        <div className="flex gap-2">
          <Tooltip title="Edit" placement="top-start">
            <button
              className="p-1 rounded-full bg-sky-300 text-white"
              onClick={() => onEdit(project.id)}
            >
              <MdModeEdit className=" text-sm" />
            </button>
          </Tooltip>
          <Tooltip title="View" placement="top-start">
            <button
              className="p-1 rounded-full bg-amber-300 text-white"
              onClick={() => onView(project.id)}
            >
              <IoMdEye className=" text-sm" />
            </button>
          </Tooltip>
          <Tooltip title="Delete" placement="top-start">
            <button
              className="p-1 rounded-full bg-green-300 text-white"
              onClick={() => onDelete(project.id)}
            >
              <MdDelete className=" text-sm" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="bg-white shadow">
        <div className="px-4 py-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Projects
          </h1>
          <Link to="addProject">
          <button className="px-3 py-1 bg-gray-800 rounded text-white">
            Add
            </button>
            </Link>
        </div>
      </header>
      <main className="px-4 lg:px-8 py-4">
        <Table data={projects} columns={columns} />
      </main>
    </div>
  );
};

export default Projects;
