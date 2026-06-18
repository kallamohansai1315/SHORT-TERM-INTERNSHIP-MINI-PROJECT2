const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Add Task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task(req.body);

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task Deleted"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;