const Project = require('../models/project');

// get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
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
      return res.status(404).json({ message: 'No project with this ID' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create  a new project 
const createProject = async (req, res) => {
    try {
      const { title, description } = req.body;
      const project = await Project.create({ title, description });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getAllProjects,
  createProject,
  getProjectById
  // Add other controller functions here
};
