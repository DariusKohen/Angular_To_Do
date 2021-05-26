const express = require('express')
const app = express()

const mongoose = require('./db/mongoose')

const bodyParser = require('body-parser')

const ListsRouter = require('./routes/lists')
const UsersRouter = require('./routes/users')

// Load middlewares
app.use(bodyParser.json())

// CORS headers middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id")
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    )
    next()
})

app.use('/lists', ListsRouter)
app.use('/users', UsersRouter)

// Routes Handlers

// List Routes

/**
 * GET /tasks
 * Pourpose: Get all tasks
 */
app.get('/tasks', (req, res) => {
    // Return an array of all tasks
    Task.find({}).then((tasks) => {
        res.send(tasks)
    })
})

/**
 * POST /task
 * Purpose: Create a task
 */
app.post('/task', (req, res) => {
    // Create a new task and return the new task with id
    // Task datas will be passed in with JSON request body
    let newTask = new Task({
        title: req.body.title
    });
    newTask.save().then((taskDoc) => {
        // The full task document is returned (with id)
        res.send(taskDoc)
    })
})

/**
 * PATCH /task/:id
 * Purpose: Update a task
 */
app.patch('/task/:id', (req, res) => {
    Task.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body}
    ).then(() => {
        res.sendStatus(200)
    })
})

/**
 * DELETE /task/:id
 * Putpose: Delete a task
 */
app.delete('/task/:id', (req, res) => {
    Task.findOneAndRemove(
        { _id: req.params.id }
    ).then(() => {
        //res.sendStatus(removedTaskDoc)
        res.sendStatus(200)
    })
})

/**
 * GET /user/:userId/tasks
 * Purpose: Get all tasks of a user
 */
app.get('/user/:userId/tasks', (req, res) => {
    task.find(
        { _userId: req.params.userId }
    ).then((tasks) => {
        res.send(tasks)
    })
})

/**
 * POST /user/:userId/task
 * Purpose: Create a new task dedicated to a user
 */
app.post('/user/:userId/task', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _userId: req.params.userId
    })
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})