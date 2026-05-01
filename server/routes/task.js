
const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();


router.post("/", auth, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});


router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
});


router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;