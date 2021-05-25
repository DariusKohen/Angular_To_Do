// Use the mongoose module for handling MongoDB connection
const mongoose = require('mongoose')

// Define the shape of a collection and settings for every values of the user element
const taskSchema = mongoose.Schema({
  title: String,
  content: String
})

// Compile and export a model from the schema for the 'tasks' collection
module.exports = mongoose.model("Task", taskSchema, 'tasks')
