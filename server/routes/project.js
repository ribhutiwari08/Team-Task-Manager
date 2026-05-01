// routes/project.js
const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

const router = express.Router();

// Create Project
router.post("/", auth, async (req, res) => {
  const project = await Project.create({
    ...req.body,
    createdBy: req.user.id
  });

  res.json(project);
});

// Get Projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;