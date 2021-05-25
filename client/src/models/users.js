// Use the mongoose module for handling MongoDB connection
const mongoose = require('mongoose')

// Define the shape of a collection and settings for every values of the user element
const userSchema = mongoose.Schema({
  name: String,
  password: String
})

// Compile and export a model from the schema for the 'users' collection
module.exports = mongoose.model("User", userSchema, 'users')
