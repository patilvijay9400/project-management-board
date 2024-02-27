const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  assigned_to: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estimated_duration: {
    type: DataTypes.INTEGER,
    allowNull: true 
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  attachments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Project;
