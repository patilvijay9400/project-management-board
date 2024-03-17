const Project = require("../models/project");

// get all projects
const getAllProjects = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  try {
    const totalCount = await Project.count(); // Get total count of projects
    const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages
    const projects = await Project.findAll({
      offset,
      limit: pageSize,
      order: [['id', 'DESC']] // Order by ID in descending order
    });
    console.log({ projects, totalPages })
    res.json({ projects, totalPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  get singal project by id
const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "No project with this ID" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create  a new project
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      start_date,
      end_date,
      status,
      priority,
      assigned_to,
      estimated_duration,
      tags,
      attachments,
      comments,
    } = req.body;
    const project = await Project.create({
      title,
      description,
      start_date,
      end_date,
      status,
      priority,
      assigned_to,
      estimated_duration,
      tags,
      attachments,
      comments,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update existing project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Cannot find the project." });
    }
    Object.keys(updates).forEach((key) => {
      project[key] = updates[key];
    });
    await project.save();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// delete  an existing project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error("The project does not exist.");
    }
    await project.destroy();
    res.status(204).send("No Content");
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  // Add other controller functions here
};
