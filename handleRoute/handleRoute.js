const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../todoSchema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema); // always model varible name convention start with capital and singular name and its a class so use new keyword

//get all todo
route.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().select({_id : 0, __v : 0, date : 0}).limit(3);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

//get active todo
route.get("/active", async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({data,});
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

//get single todo
route.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve todo" });
  }
});

//post todo
route.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save(); // `save()` now returns a promise
    res.status(200).json({
      message: "Todo was inserted successfully",
      todo: savedTodo,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
});

//post multiple todo
route.post("/all", async (req, res) => {
  try {
    const todos = await Todo.insertMany(req.body);
    res.status(201).json({
      message: "Todos were inserted successfully",
      todos,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to insert todos",
    });
  }
});

//put todo
route.put("/:id", async (req, res) => {
  try {
    // const updatedTodo = await Todo.updateOne(
    //   { _id: req.params.id },
    //   {
    //     $set: {
    //       status: "inactive",
    //     },
    //   }
    // );
    //or get data with what changes are you do
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "inactive",
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is applied
      }
    );
    if (updatedTodo) {
      res.status(200).json({
        message: "Todo was updated successfully",
        todo: updatedTodo,
      });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

//delete todo
route.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (deletedTodo) {
      res.status(200).json({
        message: "Todo was deleted successfully",
        todo: deletedTodo,
      });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = route;
