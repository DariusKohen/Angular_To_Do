const express = require('express')

const { List, Task } = require('../db/models')

const router = express.Router()

// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token')

    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            res.status(401).send(err)
        } else {
            req.user_id = decoded._id
            next()
        }
    })
}

/**
 * GET /lists
 * Purpose: Get all lists
 */
router.get('/', authenticate, (req, res) => {
    // Return array, depends on the user
    List.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists)
    }).catch((e) => {
        res.send(e)
    })
})

/**
 * POST /lists
 * Purpose: Create a list
 */
router.post('/', authenticate, (req, res) => {
    let newList = new List({
        title: req.body.title,
        _userId: req.user_id
    })
    newList.save().then((listDoc) => {
        // Return the list document
        res.send(listDoc)
    })
})

/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
router.patch('/:id', authenticate, (req, res) => {
    List.findOneAndUpdate(
        { _id: req.params.id, _userId: req.user_id },
        { $set: req.body }
    ).then(() => {
        res.send({ 'message': 'updated successfully'})
    })
})

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
router.delete('/:id', authenticate, (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc)
        Task.deleteMany({
            _listId: removedListDoc._id
        }).then(() => {
            console.log("Tasks from " + _listId + " were deleted!");
        })
    })
})


/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
router.get('/:listId/tasks', authenticate, (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks)
    })
})


/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
router.post('/:listId/tasks', authenticate, (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true
        }
        return false
    }).then((canCreateTask) => {
        if (canCreateTask) {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            })
            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc)
            })
        } else {
            res.sendStatus(404)
        }
    })
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
router.patch('/:listId/tasks/:taskId', authenticate, (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true
        }
        return false
    }).then((canUpdateTasks) => {
        if (canUpdateTasks) {
            Task.findOneAndUpdate(
                {
                    _id: req.params.taskId,
                    _listId: req.params.listId
                },
                { $set: req.body }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404)
        }
    })
})

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
router.delete('/:listId/tasks/:taskId', authenticate, (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true
        }
        return false
    }).then((canDeleteTasks) => {
        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc)
            })
        } else {
            res.sendStatus(404)
        }
    })
})

module.exports = router